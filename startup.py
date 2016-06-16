# coding:utf-8
from tornado.ioloop import IOLoop
from app import app

app.listen(8000)
IOLoop.current().start()
