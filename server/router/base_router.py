# coding:utf-8
import re

import tornado
from tornado.web import RequestHandler, authenticated, ErrorHandler, StaticFileHandler

from server import mk_res
from server import server_config
from server.log_config import logger
from server.server_config import user_cookie_key
import json

__author__ = 'uv2sun'


def router(func):
    """
    装饰器,完成必须登录认证和异常处理
    :param func:
    :return:
    """

    def exe_f(self, *args, **kwargs):
        try:
            # return authenticated(func)(self, *args, **kwargs)
            if not self.current_user:
                self.set_status(401, '登录过期')
                method = self.request.method
                accept = self.request.headers.get("Accept")
                if method == 'GET' and accept and accept.split(",")[0] == 'text/html':
                    self.render('dl.html', file='登录超时，请重新登录',
                                href='%s' % (server_config.server_route_prefix,),
                                baseURL=server_config.server_route_prefix)
                else:
                    self.write(mk_res(ret_code=401, ret_msg='登录过期'))
            else:
                return func(self, *args, **kwargs)
        except Exception, e:
            logger.exception("异常:%s" % (e.__str__(),))
            try:
                method = self.request.method
                accept = self.request.headers.get("Accept")
                if method == 'GET' and accept and accept.split(",")[0] == 'text/html':
                    regx = re.compile("HTTP\s+(\d+):.")
                    g = regx.search(e.__str__())
                    ret_code = g and g.group(1) or "未知错误"
                    self.render("error.html", ret_code=ret_code, ret_msg=e, baseURL=server_config.server_route_prefix)
                else:
                    self.write(mk_res(ret_code=99, ret_msg=e.__str__()))
            except Exception as e2:
                logger.exception(e2)
                regx = re.compile("HTTP\s+(\d+):.")
                g = regx.search(e.__str__())
                ret_code = g and g.group(1) or "未知错误"
                self.render("error.html", ret_code=ret_code, ret_msg=e,
                            baseURL=server_config.server_route_prefix)

    return exe_f


class BaseHandler(RequestHandler):
    def data_received(self, chunk):
        print 'data_received'

    def get_current_user(self):
        user_pass = self.get_secure_cookie(user_cookie_key)
        if not user_pass:
            return None
        user = json.loads(user_pass)
        return user


class PageNotFoundHandler(BaseHandler):
    def get(self, *args, **kwargs):
        self.render("error.html", ret_code='404', ret_msg='您访问的地址不存在',
                    baseURL=server_config.server_route_prefix)


class UVStaticHandler(StaticFileHandler):
    def data_received(self, chunk):
        print 'data_received'

    @router
    def __init__(self, *args, **kwargs):
        super(UVStaticHandler, self).__init__(args, kwargs)

    # @router
    def get(self, *args, **kwargs):
        print "******************"
        try:
            super(UVStaticHandler, self).get(args, kwargs)
            pass
        except Exception as e:
            logger.exception(e)
            self.render("error.html", ret_code=self.get_status(), ret_msg='%s' % (e,),
                        baseURL=server_config.server_route_prefix)
