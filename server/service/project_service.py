# coding:utf-8
from server.db.db_pool import Mysql
from server.log_config import logger

__author__ = 'uv2sun'

from server.db.dao import project_dao as project_dao


def get_projects():
    """
    查询所有项目
    :return:
    """
    return project_dao.get_projects()


def add_project(project, opr):
    """新增一个项目"""
    if project and opr:
        project.update(opr)
        db = Mysql()
        r = project_dao.add_project(project, db)
        db.dispose()
        logger.debug("添加项目 %s 条记录" % (r,))
        return r
    else:
        return 0


def update_project(project, opr):
    """更新项目"""
    if not project and not opr:
        project.update(opr)
        db = Mysql()
        r = project_dao.update_project(project, db)
        db.dispose()
    return r or 0


def get_project(project_id):
    return project_dao.get_project(project_id)
