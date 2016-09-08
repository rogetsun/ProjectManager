# coding:utf-8
import os

from server.db.dao import file_dao
from server.db.dao import func_dao
from server.db.db_pool import Mysql
from server.log_config import logger
from server.util import file_util

__author__ = 'uv2sun'


def update_file(opr, project_id, func_id, ff_id, file_id, file):
    """更新项目模块文件"""
    db = Mysql()
    try:
        f = file_dao.update_file_version(file_id, opr, db)

        func_dao.update_func_file_version(ff_id, f.get('curr_version'), db)
        ext = os.path.splitext(f.get("file_path_name"))[1]
        project_file = '%s%s%s@%s%s' % (
            project_id, os.path.sep, str(file_id), str(f.get('curr_version')), ext
        )
        logger.debug('project_file:%s' % (project_file,))
        file_util.save_file(project_file, file.body)
        db.dispose()
    except Exception as e:
        logger.error(e.message)
        db.dispose(isEnd=0)
