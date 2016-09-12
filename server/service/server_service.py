# coding:utf-8
from server.db.dao import server_dao
from server.db.db_pool import Mysql
from server.log_config import logger

__author__ = 'uv2sun'


def save_server(server):
    s = dict()
    s.setdefault('server_name', '')
    s.setdefault('server_user', '')
    s.setdefault('server_password', '')
    s.setdefault('server_ftp_user', '')
    s.setdefault('server_ftp_password', '')
    s.setdefault('server_desc', '')
    s.update(server)

    db = Mysql()
    try:
        if server and server.get('server_id'):
            server_dao.update_server(s, db)
        else:
            server_dao.add_server(s, db)
        db.dispose()
    except Exception as e:
        logger.exception(e)
        db.dispose(isEnd=0)
        raise e


def get_servers():
    return server_dao.get_servers()


def get_server_deploy(server_id):
    pass
