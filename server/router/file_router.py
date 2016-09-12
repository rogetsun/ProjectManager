# coding:utf-8
import os

import time
from tornado.httputil import HTTPFile
from server import mk_res
from server import server_config
from server.db.dao import file_dao
from server.log_config import logger
from server.server_config import project_file_folder
from .base_router import BaseHandler, router
from server.service import file_serivce

__author__ = 'uv2sun'


class FilesHandler(BaseHandler):
    @router
    def get(self, project_id):
        self.write(mk_res(data=file_serivce.get_files(project_id)))


class FileHandler(BaseHandler):
    @router
    def post(self, project_id):
        """上传文件"""
        try:
            ft_id = self.get_argument('ft_id')
            folder = self.get_argument('folder')
            opr = self.current_user
            opr['op_time'] = int(time.time() * 1000)
            fs = self.request.files
            keys = fs.keys()
            http_files = []
            for key in keys:
                f = fs.get(key)[0]
                http_files.append(f)
            if http_files.__len__() == 0:
                self.write(mk_res(ret_code=1, ret_msg='没有文件'))
            else:
                r = file_serivce.save_files(project_id, ft_id, folder, http_files, opr)
                self.write(mk_res(data=r))
        except Exception as e:
            logger.exception(e)
            self.write(mk_res(ret_code=1, ret_msg='%s' % (e.__str__(),)))

    @router
    def get(self, project_id, ft_id, file_name):
        folder = self.get_argument('folder', '')
        file_path_name = folder + os.path.sep + file_name
        logger.debug(file_path_name)
        f = file_serivce.get_file(project_id, ft_id, file_path_name)
        logger.debug(f)
        self.write(mk_res(data=f))


class FileHisHandler(BaseHandler):
    @router
    def get(self, file_id):
        self.write(mk_res(data=file_serivce.get_file_his(file_id)))


class FileDownHandler(BaseHandler):
    @router
    def get(self, file_id, version):
        f = file_dao.get_file_by_id_version(file_id, version)

        if not f:
            raise Exception("文件不存在")

        ix = os.path.exists('%s/%s/%s@%s%s' %
                            (server_config.project_file_folder, f.get('project_id'), file_id, version,
                             os.path.splitext(f.get('file_path_name'))[1]))
        if ix is False:
            self.render("error.html", ret_code="404", ret_msg="[%s]文件不存在" % (f.get('file_path_name'),))
        else:
            self.render("dl.html",
                        href='dlf/%s/%s@%s%s' % (
                            f.get('project_id'), file_id, version, os.path.splitext(f.get('file_path_name'))[1]),
                        file=os.path.basename(f.get('file_path_name')))
