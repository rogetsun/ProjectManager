# coding:utf-8
from server.router.base_router import PageNotFoundHandler
from server.router.deploy_instance_router import DeployInstanceHandler, DeployInstancesHandler
from server.router.func_file_router import FuncFileHandler
from server.router.server_router import ServerHandler, ServersHandler
from .func_router import FuncHandler, FuncsHandler, FuncDownloadHandler
from .file_type_router import FileTypeHandler
from .index_router import IndexHandler, LoginHandler, UserHandler, UserListHandler, LogoutHandler
from .project_router import ProjectHandler, ProjectsHandler
from .file_router import FilesHandler, FileHandler, FileHisHandler, FileDownHandler

__author__ = 'uv2sun'

handlers = [
    ("/", IndexHandler)
    , ('/current_user', UserHandler)
    , ("/login", LoginHandler)
    , ('/logout', LogoutHandler)
    # 测试
    , ('/user/list', UserListHandler)
    # project
    , ('/projects', ProjectsHandler)
    , ('/project/(\d+)', ProjectHandler)
    , ('/project', ProjectHandler)
    # file
    , ('/project/(\d+)/files', FilesHandler)
    , ('/project/(\d+)/file', FileHandler)
    , ('/project/(\d+)/ft/(\d+)/file/(\S+)', FileHandler)
    , ('/file/(\d+)/his', FileHisHandler)
    , ('/file/dl/(\d+)/(\d+)', FileDownHandler)
    # file-type
    , ('/project/(\d+)/file_type', FileTypeHandler)
    # func
    , ('/project/(\d+)/func', FuncHandler)
    , ('/func/(\d+)/files', FuncHandler)
    , ('/project/(\d+)/funcs', FuncsHandler)
    , ('/func/dl', FuncDownloadHandler)
    # func_file
    , ('/project/(\d+)/func/(\d+)/upd-file/(\d+)', FuncFileHandler)

    # server
    , ('/server', ServerHandler)
    , ('/server/(\d+)', ServerHandler)
    , ('/servers', ServersHandler)

    # deploy-instance
    , ('/project/(\d+)/deploy-instance', DeployInstanceHandler)
    , ('/project/(\d+)/deploy-instances', DeployInstancesHandler)


    # 404
    , ('.*', PageNotFoundHandler)
]
