# coding:utf-8
import time
from tornado.web import RequestHandler, authenticated
import os, json

from server.log_config import logger
from server.service import user_service
from server import mk_res
from server.server_config import user_cookie_key
from server import server_config
from .base_router import BaseHandler

__author__ = 'uv2sun'


class IndexHandler(BaseHandler):
    def get(self, *args, **kwargs):
        # user_pass = self.get_secure_cookie(user_cookie_key)
        user = self.current_user
        logger.debug(user)
        if user:
            r = user_service.check_login(user.get("login_no"), user.get("login_password"))
            if isinstance(r, dict):
                self.render("index.html", baseURL=server_config.server_route_prefix)
            else:
                self.render("l.html", baseURL=server_config.server_route_prefix)
        else:
            self.render("l.html", baseURL=server_config.server_route_prefix)


class LoginHandler(RequestHandler):
    """
    登录
    """

    def post(self, *args, **kwargs):
        user_pass = json.loads(self.request.body)
        if user_pass:
            user = str(user_pass.get("login_no"))
            password = str(user_pass.get("login_password"))
            r = user_service.check_login(user, password)
            if isinstance(r, dict):
                r['login_password'] = password
                self.set_secure_cookie(user_cookie_key, json.dumps(r), expires=time.time() + 60 * 60 * 2)
                self.write(mk_res())
            else:
                self.write(mk_res(ret_code=1, ret_msg=str(r)))
        else:
            self.write(mk_res(ret_code=1, ret_msg="请输入用户名密码"))

    def data_received(self, chunk):
        pass


class UserHandler(BaseHandler):
    @authenticated
    def get(self, *args, **kwargs):
        self.write(mk_res(data=self.current_user))


class UserListHandler(BaseHandler):
    @authenticated
    def post(self, *args, **kwargs):
        self.write(mk_res(data=self.current_user))


class LogoutHandler(BaseHandler):
    def get(self):
        self.clear_cookie(server_config.user_cookie_key)
        self.redirect(server_config.server_route_prefix or '/')


if __name__ == "__main__":
    print type(True)
    print type("sdf")
    print isinstance(True, bool)
