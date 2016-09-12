# coding:utf-8
from server.websocket_router.deploy_files_router import DeployFilesWSHandler

__author__ = 'uv2sun'

ws_handlers = [
    ('/ws/project/(\d+)/deploy', DeployFilesWSHandler)
]
