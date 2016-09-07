# coding:utf-8
import time

from server.db.dao import func_dao
from server.db.db_pool import Mysql

__author__ = 'uv2sun'


def save_func(func, opr):
    print type(func.get('ftFiles'))
    ftFiles = func.pop('ftFiles')
    print type(func.get('ftFiles'))
    func.update(opr)
    func['op_time'] = int(time.time() * 1000)
    db = Mysql()
    func_dao.save_func(func, db)
    func_dao.save_func_file(func, ftFiles, db)
    func['ftFiles'] = ftFiles
    db.dispose()


def get_all_func(project_id):
    return func_dao.select_all_func(project_id)


def get_func_files(func_id):
    # files = func_dao.select_func_files(func_id)
    # ret = {}
    # for f in files:
    #     if ret.get(f.get('ft_id')) is None:
    #         ret[f.get('ft_id')] = []
    #     ret.get(f.get('ft_id')).append(f)
    #
    # return ret
    return func_dao.select_func_files(func_id)
