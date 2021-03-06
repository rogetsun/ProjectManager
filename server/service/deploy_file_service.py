# coding:utf-8
from server.db.dao import deploy_file_dao

__author__ = 'uv2sun'


def save_deploy_rec(project_id, deploy_instance, files, opr, db):
    dr_id = deploy_file_dao.save_deploy_rec(project_id=project_id, deploy_instance=deploy_instance, opr=opr, db=db)
    deploy_file_dao.save_deploy_files_rec(project_id=project_id, dr_id=dr_id, files=files, db=db)
    return dr_id


def flag_failure(dr_id, message):
    if len(message) > 1000:
        msg = message[0, 1000]
    else:
        msg = message
    deploy_file_dao.flag_failure(dr_id, msg)
