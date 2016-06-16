# coding:utf-8
import os

from server.db.dao import file_dao as file_dao
from server.db.db_pool import Mysql
from server.log_config import logger
from server.util import file_util

__author__ = 'uv2sun'


def get_files(project_id):
    r = file_dao.get_files(project_id)
    return r


def save_files(project_id, ft_id, folder, http_files, opr):
    db = Mysql()
    try:
        ret = []
        param = dict()
        param.update(opr)
        param['project_id'] = project_id
        param['ft_id'] = ft_id
        param['file_desc'] = ''
        for hf in http_files:
            filename = hf.filename
            param['file_name'] = filename
            ext = os.path.splitext(filename)[1]
            file_path_name = folder + os.path.sep + filename
            logger.debug('file_path_name:%s' % (file_path_name,))
            param['file_path_name'] = file_path_name
            file_dao.save_file(param, db)

            project_file = '%s%s%s@%s%s' % (
                project_id, os.path.sep, str(param.get('file_id')), str(param.get('curr_version')), ext
            )
            logger.debug('project_file:%s' % (project_file,))
            file_util.save_file(project_file, hf.body)
            tmp_file = dict()
            tmp_file.update(param)
            ret.append(tmp_file)
        db.dispose()
        return ret
    except Exception as e:
        logger.exception(e)
        db.dispose(isEnd=0)
        raise e


def get_file(project_id, ft_id, file_path_name):
    db = Mysql()
    f = file_dao.get_file(project_id, ft_id, file_path_name, db)
    db.dispose()
    return f


def get_file_his(file_id):
    return file_dao.get_file_his(file_id)
