# coding:utf-8
from server.db.db_pool import Mysql

__author__ = 'uv2sun'


def get_all_file_type(project_id):
    db = Mysql()
    r = db.getAll(
        '''SELECT
          a.*,
          b.*,
          ifnull(c.count, 0) AS count
        FROM (SELECT *
              FROM pm.d_file_type
              WHERE project_id = %s) a
          LEFT JOIN pm.d_login b ON a.create_login_id = b.login_id
          LEFT JOIN (SELECT
                       ft_id,
                       count(1) AS count
                     FROM pm.d_file
                     WHERE project_id = %s
                     GROUP BY ft_id) c ON a.ft_id = c.ft_id;
        ''',
        (project_id, project_id))
    db.dispose()
    return r


def add_file_type(param, db=Mysql()):
    param.setdefault('ft_deploy_path', '')
    r = db.insertOne("""insert into pm.d_file_type(
                project_id, ft_folder, ft_name, ft_deploy_path, ft_desc, create_time, create_login_id)
      VALUES (%(project_id)s,%(ft_folder)s,%(ft_name)s,%(ft_deploy_path)s,%(ft_desc)s,%(op_time)s,%(login_id)s)""",
                     param)
    return r


def update_file_type(param, db=Mysql()):
    param.setdefault('ft_deploy_path', '')
    r = db.update('''update pm.d_file_type set
    ft_name=%(ft_name)s, ft_folder=%(ft_folder)s, ft_deploy_path=%(ft_deploy_path)s, ft_desc=%(ft_desc)s
    where ft_id=%(ft_id)s''', param)
    return r
