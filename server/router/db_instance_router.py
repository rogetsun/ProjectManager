# coding:utf-8
import json

import time

from server import mk_res
from server.log_config import logger
from server.router.base_router import BaseHandler
from server.service import db_instance_service

__author__ = 'uv2sun'


class DBInstanceHandler(BaseHandler):
    def post(self, project_id):
        db_instance = json.loads(self.request.body)
        logger.debug(db_instance)
        db_instance_service.save_db_instance(project_id=project_id, db_instance=db_instance)
        self.write(mk_res())

    def delete(self, project_id, db_id):
        db_instance_service.del_db_instance(db_id)
        self.write(mk_res())

    def get(self, project_id):
        db_instances = db_instance_service.get_db_instances(project_id)
        self.write(mk_res(data=db_instances))

    def put(self, db_id):
        sql = self.request.body
        opr = self.current_user
        opr['op_time'] = int(time.time() * 1000)
        db_instance_service.exec_sql(db_id=db_id, sql=sql, opr=opr)
        self.write(mk_res())
