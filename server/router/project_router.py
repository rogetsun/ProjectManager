# coding:utf-8
import json

import time
from .base_router import BaseHandler, router
from server.service import project_service
from server import mk_res


class ProjectsHandler(BaseHandler):
    @router
    def get(self, *args, **kwargs):
        self.write(mk_res(data=project_service.get_projects()))


class ProjectHandler(BaseHandler):
    """
    项目请求处理
    """

    @router
    def get(self, project_id):
        """查询所有项目"""
        if project_id:
            self.write(mk_res(data=project_service.get_project(project_id)))
        else:
            self.write(mk_res(data=project_service.get_projects()))

    @router
    def post(self):
        """新建项目"""
        param = json.loads(self.request.body)
        if param:
            op_time = int(time.time() * 1000)
            opr = dict()
            opr.update(self.current_user)
            opr['op_time'] = op_time
            r = project_service.add_project(param, opr)
            self.write(mk_res(data={"aff_row": r or 0}))
        else:
            self.write(mk_res(ret_code=1, ret_msg='项目信息不完整'))

    @router
    def put(self, *args, **kwargs):
        """修改项目"""
        param = json.loads(self.request.body)
        if param:
            op_time = int(time.time() * 1000)
            opr = dict()
            opr.update(self.current_user)
            opr['op_time'] = op_time
            r = project_service.update_project(param, opr)
        self.write(mk_res(data={'aff_row': r or 0}))
