# coding:utf-8
from tornado.ioloop import IOLoop
from app import app
import tornado

from server.log_config import logger

logger.debug("tornado version:%s" % (tornado.version,))

app.listen(8000)
IOLoop.current().start()
