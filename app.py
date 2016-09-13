# coding:utf-8
import os

import tornado
from tornado.web import Application

from server import server_config
from server.log_config import logger
from server.router import handlers
from server.websocket_router import ws_handlers

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
    login_url=server_config.server_route_prefix,
    debug=server_config.debug,
)
logger.debug(setting)

# 加项目route url前缀
tmp_handlers = []
for h in staticHandlers + handlers + ws_handlers:
    url = h[0]
    if url.__len__() > 0 and url[-1] == "/":
        url = url[0:-1]
    tmp_url = "%s%s" % (server_config.server_route_prefix, url)
    tmp_handler = (tmp_url,) + h[1:]
    logger.debug(tmp_handler)
    tmp_handlers.append(tmp_handler)

app = Application(tmp_handlers, **setting)
