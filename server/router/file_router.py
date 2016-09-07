# coding:utf-8
import os

import time
from tornado.httputil import HTTPFile
from server import mk_res
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

    def get(self, project_id, ft_id, file_name):
        folder = self.get_argument('folder', '')
        file_path_name = folder + os.path.sep + file_name
        print file_path_name
        f = file_serivce.get_file(project_id, ft_id, file_path_name)
        print f
        self.write(mk_res(data=f))


class FileHisHandler(BaseHandler):
    def get(self, file_id):
        self.write(mk_res(data=file_serivce.get_file_his(file_id)))
