# coding:utf-8
import time
from tornado.websocket import WebSocketHandler

__author__ = 'uv2sun'


class DeployFilesWSHandler(WebSocketHandler):
    def data_received(self, chunk):
        pass

    def open(self, *args, **kwargs):
        print args
        print kwargs
        idx = 1
        while True:
            self.write_message("%s seconds" % (idx,))
            time.sleep(1)

    def on_message(self, message):
        print message
        self.write_message('ret:%s' % (message,))

    def on_close(self):
        print 'close'
