# coding:utf-8
import os

import tornado
from tornado.web import Application

from server import server_config
from server.log_config import logger
from server.router import handlers

staticHandlers = [
    # ("/node_modules/(.*)", tornado.web.StaticFileHandler, {'path': os.path.dirname(__file__) + "/node_modules"}),
    ("/app/(.*)", tornado.web.StaticFileHandler, {"path": os.path.dirname(__file__) + "/web/app"})
    , ("/assets/(.*)", tornado.web.StaticFileHandler, {"path": os.path.dirname(__file__) + "/web/assets"})
    , ("/dist/(.*)", tornado.web.StaticFileHandler, {"path": os.path.dirname(__file__) + "/web/dist"})
    , ("/dl/(.*)", tornado.web.StaticFileHandler, {"path": os.path.dirname(__file__) + "/web/download"})
    , ("/dlf/(.*)", tornado.web.StaticFileHandler, {"path": os.path.dirname(__file__) + "/server/files"})
]

setting = dict(
    template_path=os.path.dirname(__file__) + "/web",
    cookie_secret="0987654poiuytrewqlkjhgfdsamnbvcxzsongywSONGYWLITIANXINGlitianxing123abc,./<>?",
    login_url=server_config.server_route_prefix + "/",
    debug=server_config.debug,
    # max_buffer_size="200MB",
    # max_body_size="200MB",
)
logger.debug(setting)

# 加项目route url前缀
tmp_handlers = []
for h in staticHandlers + handlers:
    tmp_url = "%s%s" % (server_config.server_route_prefix, h[0][-1] == "/" and h[0][0:-1] or h[0])
    tmp_handler = (tmp_url,) + h[1:]
    logger.debug(tmp_handler)
    tmp_handlers.append(tmp_handler)

app = Application(tmp_handlers, **setting)
