# coding:utf-8
__author__ = 'uv2sun'
import hashlib

from server.db.dao import user_dao as userDao


def check_login(login_no, login_password):
    """
    校验用户名密码
    :param login_no
    :param login_password
    :return:
    """
    user = userDao.select_by_login_no(login_no)
    if user:
        md5 = hashlib.md5()
        md5.update(login_password)
        lpmd5 = md5.hexdigest()
        if lpmd5 == user.get('login_password'):
            return user
        else:
            return "密码错误"
    else:
        return '用户%s不存在' % (str(login_no),)
