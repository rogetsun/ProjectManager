# coding:utf-8
from server.db.db_pool import Mysql

__author__ = 'uv2sun'


def select_by_login_no(login_no):
    """
    通过login_no查询用户
    :param login_no:
    :return:
    """
    db = Mysql()
    user = db.getOne("select * from pm.d_login where login_no=%s", (login_no,))
    db.end()
    return user
