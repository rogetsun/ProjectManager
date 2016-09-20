# coding:utf-8
from server.db.dao import db_instance_dao
from server.db.db_pool import Mysql
from server.log_config import logger
import MySQLdb

__author__ = 'uv2sun'


def get_db_instances(project_id):
    ret = db_instance_dao.get_db_instances(project_id)
    return ret


def save_db_instance(project_id, db_instance):
    db = Mysql()
    try:
        db_id = db_instance_dao.save_db_instance(project_id, db_instance, db)
        db.dispose()
    except Exception as e:
        db.dispose(isEnd=0)
        raise e
    return db_id


def del_db_instance(db_id):
    db = Mysql()
    try:
        db_instance_dao.del_db_instance(db_id, db)
        db.dispose()
    except Exception as e:
        db.dispose(isEnd=0)
        raise e


# 在指定数据库实例执行sql，并生成执行记录
def exec_sql(db_id, sql, opr):
    db = Mysql()
    conn = None
    try:
        db_instance = db_instance_dao.get_db_instance(db_id)
        db_instance_dao.save_db_exec_sql(db_id, sql, opr, db)
        conn = MySQLdb.connect(host=db_instance.get('db_host', 'localhost'), port=int(db_instance.get('db_port', 3306)),
                               user=db_instance.get('db_user'), passwd=db_instance.get('db_passwd'),
                               db=db_instance.get('db_name'), charset='utf8')
        cur = conn.cursor()
        cur.execute(sql)
        conn.commit()
        cur.close()
        conn.close()
        db.dispose()
    except Exception as e:
        db.dispose(isEnd=0)
        try:
            conn and conn.close()
        except Exception as e1:
            logger.exception(e1)
        raise e
