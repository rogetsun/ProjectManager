# coding:utf-8
__author__ = 'uv2sun'
from server.db.db_pool import Mysql


def add_project(project, db=Mysql()):
    """
    新建项目工程
    :param db:
    :param project:
    :return:
    """
    r = db.insertOne("""insert into pm.d_project(project_name, project_desc, create_time, create_login_id)
        VALUES (%(project_name)s, %(project_desc)s, %(op_time)s, %(login_id)s)""", project)
    return r


def update_project(project, db=Mysql()):
    """
    更新项目
    :param project:
    :param db:
    :return:
    """
    r = db.update("""update pm.d_project
        set project_name = %(project_name)s,
            project_desc = %(project_desc)s
        where project_id=%(project_id)s""", project)
    return r


def get_projects():
    db = Mysql()
    r = db.getAll(
        "select * from pm.d_project a, pm.d_login b where a.create_login_id = b.login_id order by project_id desc")
    db.dispose()
    return r


def get_project(project_id):
    db = Mysql()
    r = db.getOne("select * from pm.d_project a, pm.d_login b where a.create_login_id = b.login_id and a.project_id=%s",
                  (project_id,))
    db.dispose()
    return r
