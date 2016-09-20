# coding:utf-8
from server.db.db_pool import Mysql

__author__ = 'uv2sun'


def save_deploy_rec(project_id, deploy_instance, opr, db):
    dr_id = db.insertOne("""insert into pm.d_deploy_rec(project_id, di_id, login_id, deploy_time, status, note)
                    VALUES (%s,%s,%s,%s,%s,%s)
                    """, (project_id, deploy_instance.get('di_id'), opr.get('login_id'), opr.get('op_time'), '0', ''))
    return dr_id


def save_deploy_files_rec(project_id, dr_id, files, db):
    for f in files:
        db.insertOne("""insert into pm.d_deploy_files_rec(dr_id, project_id, file_id, version)
                    VALUES (%s, %s, %s, %s)
                  """, (dr_id, project_id, f.get('file_id'), f.get('max_version') or f.get('version')))
