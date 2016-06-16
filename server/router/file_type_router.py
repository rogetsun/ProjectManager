# coding:utf-8
import json

import time

from server import mk_res
from server.log_config import logger
from server.router.base_router import BaseHandler
from server.service import file_type_service

__author__ = 'uv2sun'


class FileTypeHandler(BaseHandler):
    def get(self, project_id):
        r = file_type_service.get_file_types(project_id)
        logger.debug(r)
        self.write(mk_res(data=r))

    def post(self, project_id):
        file_type = json.loads(self.request.body)
        opr = self.current_user
        opr['op_time'] = int(time.time() * 1000)
        file_type['project_id'] = project_id
        logger.debug(file_type)
        r = file_type_service.add_file_type(file_type, opr)
        self.write(mk_res(data={'ft_id': r}))

    def put(self, project_id):
        file_type = json.loads(self.request.body)
        file_type['project_id'] = project_id
        logger.debug(file_type)
        r = file_type_service.update_file_type(file_type)
        self.write(mk_res(data={'aff_row': r}))
