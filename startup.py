# coding:utf-8
from tornado.ioloop import IOLoop
from app import app
import tornado

from server.log_config import logger

logger.debug("tornado version:%s" % (tornado.version,))

setting = {
    "max_buffer_size": 204800000  # 200MB
}

app.listen(8000, address="0.0.0.0", **setting)
IOLoop.current().start()
