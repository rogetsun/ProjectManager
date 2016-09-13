# coding:utf-8
import time
from tornado.websocket import WebSocketHandler
from tornado.web import asynchronous

__author__ = 'uv2sun'


class DeployFilesWSHandler(WebSocketHandler):
    def data_received(self, chunk):
        pass

    @asynchronous
    def open(self, *args, **kwargs):
        print args
        print kwargs

    def on_message(self, message):
        print message
        self.write_message('ret:%s' % (message,))

    def on_close(self):
        print 'close'
