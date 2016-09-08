# coding:utf-8
from tornado.ioloop import IOLoop
from app import app
import tornado

print "tornado version:%s" % (tornado.version,)

app.listen(8000)
IOLoop.current().start()
