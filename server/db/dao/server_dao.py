# coding:utf-8
from server.db.db_pool import Mysql

__author__ = 'uv2sun'


def add_server(server, db):
    server_id = db.insertOne("""insert into pm.d_server(
        server_name, server_desc, server_ip, server_user, server_password, server_ftp_user, server_ftp_password)
        values(%(server_name)s, %(server_desc)s, %(server_ip)s, %(server_user)s, %(server_password)s,
        %(server_ftp_user)s, %(server_ftp_password)s)
        """, server)
    return server_id


def update_server(server, db):
    r = db.update("""update pm.d_server set
        server_name = %(server_name)s,
        server_desc = %(server_desc)s,
        server_ip = %(server_ip)s,
        server_user = %(server_user)s,
        server_password = %(server_password)s,
        server_ftp_user = %(server_ftp_user)s,
        server_ftp_password = %(server_ftp_password)s
        where server_id = %(server_id)s
        """, server)
    return r


def get_servers():
    db = Mysql()
    ss = db.getAll("select * from pm.d_server")
    db.dispose()
    return ss
