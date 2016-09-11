# coding:utf-8
from flask import json

from server import mk_res
from server.router.base_router import BaseHandler, router
from server.service import deploy_instance_service

__author__ = 'uv2sun'


class DeployInstanceHandler(BaseHandler):
    @router
    def post(self, project_id):
        print "#############%s" % (project_id,)
        di = json.loads(self.request.body)
        di = deploy_instance_service.save_deploy_instance(project_id, di)
        self.write(mk_res(di))


class DeployInstancesHandler(BaseHandler):
    @router
    def get(self, project_id):
        dis = deploy_instance_service.get_deploy_instances(project_id)
        self.write(mk_res(dis))
