# coding:utf-8
import json
import os
import re
import zipfile

import time
from tornado.web import HTTPError, asynchronous

from server import server_config
from server import mk_res
from server.db.dao import func_dao
from server.log_config import logger
from server.router.base_router import BaseHandler, router
from server.service import func_service
from server.db.dao import file_type_dao

__author__ = 'uv2sun'


class FuncHandler(BaseHandler):
    @router
    def post(self, project_id):
        try:
            func = json.loads(self.request.body)
            func['project_id'] = project_id
            opr = self.current_user

            func_service.save_func(func, opr)
            self.write(mk_res(data=func))
        except Exception as e:
            logger.exception(e)
            raise e

    @router
    def get(self, func_id):
        self.write(mk_res(data=func_service.get_func_files(func_id)))


class FuncsHandler(BaseHandler):
    @router
    def get(self, project_id):
        self.write(mk_res(data=func_service.get_all_func(project_id)))


class FuncDownloadHandler(BaseHandler):
    @asynchronous
    @router
    def get(self):
        func_ids = self.get_argument("fid")
        logger.debug(type(func_ids))
        logger.debug(func_ids)
        logger.debug(len(func_ids))
        if len(func_ids) > 0:
            regx = re.compile(',*(\d+),*')
            func_id_list = regx.findall(func_ids)
            file_list = func_dao.select_funcs_files(func_id_list)

            if len(file_list) == 0:
                raise HTTPError(status_code=404, log_message='模块没有可下载文件!')

            files = dict()
            for f in file_list:
                if not files.get(f.get('file_id')):
                    files[f.get('file_id')] = f
                elif f.get('file_version') > files.get(f.get('file_id')).get('file_version'):
                    files[f.get('file_id')] = f

            if not os.path.exists(server_config.zip_file_folder):
                os.makedirs(server_config.zip_file_folder)

            real_zip_file_name = server_config.zip_file_folder + os.sep + 'modules(%s)@%s.zip' % (
                "-".join(func_id_list), int(time.time() * 1000))

            zip_pkg = zipfile.ZipFile(real_zip_file_name, 'w')
            for (fid, f) in files.iteritems():
                ext = os.path.splitext(f.get('file_path_name'))[1]
                real_file = '%s/%s/%s@%s%s' % (
                    server_config.project_file_folder, f.get('project_id'), f.get('file_id'), f.get('file_version'),
                    ext)
                logger.debug('real_file:%s' % (real_file,))
                zip_file = '%s%s' % (f.get('ft_folder'), str(f.get('file_path_name')))
                logger.debug('zip_file:%s' % (zip_file,))
                zip_pkg.write(filename=real_file, arcname=zip_file)
            zip_pkg.close()

            self.render("dl.html", href='dl/' + os.path.basename(real_zip_file_name),
                        file=os.path.basename(real_zip_file_name))
            self.finish()
        else:
            raise HTTPError(status_code=404, log_message='未选择下载模块!')
            # zipfile.ZipFile()
