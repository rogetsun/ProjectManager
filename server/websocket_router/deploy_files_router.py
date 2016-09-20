# coding:utf-8
import json
import os
import threading
import time
from ftplib import FTP

from tornado.websocket import WebSocketHandler

from server import server_config
from server.db.db_pool import Mysql
from server.log_config import logger
from server.router.base_router import BaseHandler
from server.service import deploy_file_service

__author__ = 'uv2sun'


class DeployFilesWSHandler(WebSocketHandler, BaseHandler):
    project_id = None

    def check_origin(self, origin):
        return True

    def data_received(self, chunk):
        pass

    def open(self, project_id):
        print "project_id:%s" % (project_id,)
        self.project_id = project_id

        # def beat(ws):
        #     for i in range(1000):
        #         ws.write_message('seconds %s' % (i,))
        #         time.sleep(1)
        #
        # this = self
        # threading.Thread(target=beat, args=(this,)).start()

    def on_message(self, message):
        try:
            # print message
            msg = json.loads(message)
            di = msg.get('deployInstance')
            files = msg.get('files')
            db = Mysql()
            opr = self.current_user
            opr['op_time'] = int(time.time() * 1000)
            deploy_file_service.save_deploy_rec(project_id=self.project_id, deploy_instance=di, files=files, opr=opr,
                                                db=db)
            db.dispose()

            if di and files:
                ftp = Ftper(ftp_host=di.get('server_ip'), ftp_user=di.get('server_ftp_user'),
                            ftp_password=di.get('server_ftp_password'), files=files, root_path=di.get('di_root_path'),
                            project_id=self.project_id, websocket=self)
                print ftp
                try:
                    ftp.start()
                except Exception as e:
                    logger.exception(e)
                    self.write_message(json.dumps({"msg_type": 'cmd_err', 'msg': e.message}))
                    self.close(code=2, reason=e.message)
            else:
                self.write_message(json.dumps({"msg_type": 'cmd_err', 'msg': '没有部署实例或文件'}))
                self.close(code=1, reason='没有部署实例或文件')
        except Exception as e:
            logger.exception(e)
            self.write_message(json.dumps({'msg_type': 'cmd_err', 'msg': e.message}))
            self.close(code=1, reason=e.message)

    def on_close(self):
        print 'close'


class Ftper(threading.Thread):
    ftp_client = None
    need_files = []
    over_files = []

    def __init__(self, ftp_host, ftp_user, ftp_password, root_path, files, websocket, project_id):
        super(Ftper, self).__init__()
        self.ftp_host = ftp_host
        self.ftp_user = ftp_user
        self.ftp_password = ftp_password
        self.root_path = root_path
        self.need_files = files
        self.websocket = websocket
        self.project_id = project_id

    def ftp(self):
        try:
            self.ftp_client = FTP()
            # ready链接ftp host
            msg = dict(msg_type='status', msg='ftp ready to connect %s by %s' % (self.ftp_host, self.ftp_user))
            logger.debug(msg)
            self.websocket.write_message(json.dumps(msg))
            # 链接 ftp host
            self.ftp_client.connect(host=self.ftp_host, timeout=20)
            msg['msg'] = "ftp connect %s ok" % (self.ftp_host,)
            logger.debug(msg)
            self.websocket.write_message(json.dumps(msg))
            # 登录
            msg['msg'] = 'ready to ftp login %s with %s/%s' % (self.ftp_host, self.ftp_user, self.ftp_password)
            logger.debug(msg)
            self.websocket.write_message(json.dumps(msg))
            self.ftp_client.login(user=self.ftp_user, passwd=self.ftp_password)
            msg['msg'] = 'ftp login with %s ok' % (self.ftp_user,)
            logger.debug(msg)
            self.websocket.write_message(json.dumps(msg))

            # 循环ftp文件
            for f in self.need_files:
                # 进入部署根目录
                msg['msg_type'] = 'status'
                msg['msg'] = 'ready to cd %s' % (self.root_path,)
                logger.debug(msg)
                self.websocket.write_message(json.dumps(msg))
                self.ftp_client.cwd(self.root_path)
                msg['msg'] = 'cd %s ok' % (self.root_path,)
                logger.debug(msg)
                self.websocket.write_message(json.dumps(msg))

                logger.debug('ready to ftp file:%s' % (json.dumps(f),))
                file_path = f['ft_deploy_path'] or f['ft_folder']
                logger.debug('real file path:%s' % (file_path,))
                ftp_file = '%s%s' % (file_path, f['file_path_name'])
                local_file = '%s/%s/%s@%s%s' % (
                    server_config.project_file_folder, self.project_id, f['file_id'],
                    f.get('max_version') or f.get('version'),
                    os.path.splitext(f['file_path_name'])[1]
                )
                # ftp文件
                logger.debug('local_file:%s', (local_file,))
                logger.debug('ftp_file:%s', (ftp_file,))
                self.put_file(ftp_file=ftp_file, local_file=local_file)
                msg['msg_type'] = 'cmd_file'
                msg['file'] = f
                msg['msg'] = None
                self.websocket.write_message(json.dumps(msg))
            msg['msg_type'] = 'cmd_over'
            msg['msg'] = ""
            self.websocket.write_message(json.dumps(msg))
            self.ftp_client.quit()
            msg['msg_type'] = 'status'
            msg['msg'] = 'ftp quit'
            self.websocket.write_message(json.dumps(msg))
            msg['msg_type'] = 'cmd_end'
            msg['msg'] = '文件部署成功'
            self.websocket.write_message(json.dumps(msg))
            time.sleep(0.1)
            self.websocket.close(code=0)
        except Exception as e:
            logger.exception(e)
            self.websocket.write_message(json.dumps({'msg_type': 'cmd_err', 'msg': e.message}))
            self.websocket.close(code=2, reason=e.message)

    def put_file(self, ftp_file, local_file):
        """执行ftp put操作，但是要循环建立远端目录"""
        fps = ('%s' % (ftp_file,)).split(os.sep)
        logger.debug(fps)
        # 循环建立远端目录
        for i in range(1, fps.__len__() - 1):
            f = fps[i]
            if f is "":
                continue
            else:
                if self.ftp_client.nlst().count(f) == 0 and f != ".":
                    self.ftp_client.mkd(f)
            self.ftp_client.cwd(f)
            self.websocket.write_message({'msg_type': 'status', 'msg': 'cd %s ok' % (f,)})
        self.websocket.write_message({'msg_type': 'status', 'msg': u'开始上传[%s]' % (ftp_file,)})
        self.ftp_client.storbinary('STOR %s' % (fps[-1],), open(local_file))

    def run(self):
        self.ftp()
