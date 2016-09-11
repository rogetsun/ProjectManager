# coding:utf-8
from server.db.dao import deploy_instance_dao
from server.db.db_pool import Mysql
from server.log_config import logger

__author__ = 'uv2sun'


def save_deploy_instance(project_id, di):
    """新增或更新部署实例信息"""
    di['project_id'] = di.get('project_id') or project_id
    db = Mysql()
    try:
        if di.get('di_id'):
            deploy_instance_dao.update_deploy_instance(di, db)
        else:
            di_id = deploy_instance_dao.add_deploy_instance(di, db)
            di['di_id'] = di_id
        db.dispose()
        return di
    except Exception as e:
        logger.exception(e)
        db.dispose(isEnd=0)
        raise e


def get_deploy_instances(project_id):
    return deploy_instance_dao.get_deploy_instances(project_id)
