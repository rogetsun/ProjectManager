# coding:utf-8
from flask import json

from server import mk_res
from server.log_config import logger
from server.router.base_router import BaseHandler, router
from server.service import server_service

__author__ = 'uv2sun'


class ServerHandler(BaseHandler):
    @router
    def post(self):
        server = json.loads(self.request.body)
        logger.debug(server)
        server_service.save_server(server)
        self.write(mk_res())

    @router
    def put(self):
        server = json.loads(self.request.body)
        logger.debug(server)
        server_service.save_server(server)
        self.write(mk_res())

    @router
    def get(self, server_id):
        server = server_service.get_server_deploy(server_id)
        self.write(mk_res(server))


class ServersHandler(BaseHandler):
    @router
    def get(self):
        ss = server_service.get_servers()
        self.write(mk_res(ss))
