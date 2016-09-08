# coding:utf-8

from base_router import BaseHandler, router

import time
from tornado.httputil import HTTPFile
from server import mk_res
from server.log_config import logger
from server.server_config import project_file_folder
from server.service import func_file_service

__author__ = 'uv2sun'


class FuncFileHandler(BaseHandler):
    @router
    def post(self, project_id, func_id, ff_id):
        """更新模块文件"""
        opr = self.current_user
        opr['op_time'] = int(time.time() * 1000)
        try:
            file_id = self.get_argument("file_id")
            fs = self.request.files
            keys = fs.keys()
            http_files = []
            for key in keys:
                f = fs.get(key)[0]
                http_files.append(f)
            if http_files.__len__() == 0:
                self.write(mk_res(ret_code=1, ret_msg='没有文件'))
            elif http_files.__len__() > 1:
                self.write(mk_res(ret_code=1, ret_msg='一次只能上传一个文件'))
            else:
                ret_file = func_file_service.update_file(opr, project_id, func_id, ff_id, file_id, http_files[0])
                self.write(mk_res(data=ret_file))
        except Exception as e:
            logger.exception(e)
            self.write(mk_res(ret_code=1, ret_msg='%s' % (e.__str__(),)))
