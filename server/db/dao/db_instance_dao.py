# coding:utf-8
from server.db.db_pool import Mysql

__author__ = 'uv2sun'


def get_db_instances(project_id):
    db = Mysql()
    ret = db.getAll("""select * from pm.d_db_instance where project_id = %s""", (project_id,))
    db.dispose()
    return ret


def get_db_instance(db_id):
    db = Mysql()
    db_ins = db.getOne("""select * from pm.d_db_instance where db_id = %s""", (db_id,))
    db.dispose()
    return db_ins


def save_db_instance(project_id, db_instance, db):
    db_id = db.insertOne("""
        insert into pm.d_db_instance(project_id, db_host, db_port, db_user, db_passwd, db_name)
        VALUES (%s, %s, %s, %s, %s, %s)
    """, (project_id, db_instance.get('db_host', ''), db_instance.get('db_port', ''), db_instance.get('db_user', ''),
          db_instance.get('db_passwd', ''), db_instance.get('db_name', '')))
    return db_id


def del_db_instance(db_id, db):
    return db.delete("""delete from pm.d_db_instance where db_id = %s""", (db_id,))


# sql执行记录
def save_db_exec_sql(db_id, sql, opr, db):
    rec_id = db.insertOne("""insert into pm.d_db_sql_rec(db_id, login_id, op_time, exec_sql) VALUES (%s,%s,%s,%s)""",
                          (db_id, opr.get('login_id'), opr.get('op_time'), sql))
    return rec_id
