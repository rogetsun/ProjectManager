# coding:utf-8
from server.db.db_pool import Mysql

__author__ = 'uv2sun'


def add_deploy_instance(di, db):
    """添加项目部署实例"""
    di_id = db.insertOne("""
    insert into pm.d_deploy_instance(project_id, di_name, server_id, di_root_path, di_start_shell, di_stop_shell)
    VALUES (%s,%s,%s,%s,%s,%s)
    """, (di.get('project_id'), di.get('di_name'), di.get('server_id'), di.get('di_root_path', ''),
          di.get('di_start_shell', ''), di.get('di_stop_shell', '')))

    return di_id


def update_deploy_instance(di, db):
    """更新项目部署实例"""
    db.update("""update pm.d_deploy_instance set
        di_name=%s,
        server_id=%s,
        di_root_path=%s,
        di_start_shell=%s,
        di_stop_shell=%s
        WHERE di_id=%s
    """, (di.get('di_name'), di.get('server_id'), di.get('di_root_path', ''), di.get('di_start_shell'),
          di.get('di_stop_shell'),
          di.get('di_id')))


def get_deploy_instances(project_id):
    """查询项目所有部署实例"""
    db = Mysql()
    dis = db.getAll("""select * from pm.d_deploy_instance a, pm.d_server b
      where a.server_id = b.server_id and project_id=%s""", (project_id,))
    db.dispose()
    return dis
