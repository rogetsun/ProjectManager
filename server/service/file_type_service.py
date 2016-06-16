# coding:utf-8
from server.db.dao import file_type_dao
from server.db.db_pool import Mysql

__author__ = 'uv2sun'


def get_file_types(project_id):
    return file_type_dao.get_all_file_type(project_id)


def add_file_type(file_type, opr):
    param = dict()
    param.update(file_type)
    param.update(opr)
    db = Mysql()
    r = file_type_dao.add_file_type(param, db)
    db.dispose()
    return r


def update_file_type(file_type):
    db = Mysql()
    r = file_type_dao.update_file_type(file_type, db)
    db.end()
    return r
