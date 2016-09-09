# coding:utf-8
from tornado.ioloop import IOLoop
from app import app
import tornado
import sys

from server.log_config import logger

logger.debug("tornado version:%s" % (tornado.version,))

setting = {
    "max_buffer_size": 204800000  # 200MB
}

if __name__ == "__main__":
    port = sys.argv.__len__() >= 2 and sys.argv[1] or 2204
    port = int(port)
    ip = sys.argv.__len__() >= 3 and sys.argv[2] or "0.0.0.0"

    app.listen(port, address=ip, **setting)
    logger.debug("app.listen %s:%s" % (ip, port))
    IOLoop.current().start()
