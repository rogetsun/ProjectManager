# coding:utf-8
import os

import tornado
from tornado.web import Application

from server import server_config
from server.router import handlers

staticHandlers = [
    # ("/node_modules/(.*)", tornado.web.StaticFileHandler, {'path': os.path.dirname(__file__) + "/node_modules"}),
    ("/app/(.*)", tornado.web.StaticFileHandler, {"path": os.path.dirname(__file__) + "/web/app"})
    , ("/assets/(.*)", tornado.web.StaticFileHandler, {"path": os.path.dirname(__file__) + "/web/assets"})
    , ("/dist/(.*)", tornado.web.StaticFileHandler, {"path": os.path.dirname(__file__) + "/web/dist"})
    , ("/dl/(.*)", tornado.web.StaticFileHandler, {"path": os.path.dirname(__file__) + "/web/download"})
]

setting = dict(
    template_path=os.path.dirname(__file__) + "/web",
    cookie_secret="0987654poiuytrewqlkjhgfdsamnbvcxzsongywSONGYWLITIANXINGlitianxing123abc,./<>?",
    login_url="/",
    debug=server_config.debug
)
print setting

app = Application(staticHandlers + handlers, **setting)
