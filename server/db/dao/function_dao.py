# coding:utf-8
__author__ = 'uv2sun'
from server.db.db_pool import Mysql


def get_functions(project_id):
    """
    查询项目所有功能
    :param project_id:
    :return:
    """
    db = Mysql()
    r = db.getAll("select * from pm.d_function where project_id=%s", (project_id,))
    db.end()
    return r
