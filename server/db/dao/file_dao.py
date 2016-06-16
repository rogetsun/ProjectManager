# coding:utf-8
from server.db.db_pool import Mysql
from server.log_config import logger

__author__ = 'uv2sun'


def get_files(project_id):
    db = Mysql()
    r = db.getAll(
        "select * from pm.d_file a, pm.d_login b where a.create_login_id=b.login_id and project_id=%s order by file_path_name",
        (project_id,))
    db.dispose()
    return r


def save_file(file_dict, db):
    f = get_file(file_dict.get('project_id'), file_dict.get('ft_id'), file_dict.get('file_path_name'), db)
    if f:
        file_dict['file_id'] = f.get('file_id')
        file_dict['curr_version'] = f.get('curr_version') + 1
        db.delete(
            """delete from pm.d_file
            where project_id=%(project_id)s and file_path_name=%(file_path_name)s and ft_id=%(ft_id)s""", file_dict)
        db.insertOne("""
          insert into pm.d_file(file_id, project_id, file_path_name, curr_version, file_desc, ft_id, create_time, create_login_id)
          values (%(file_id)s,%(project_id)s,%(file_path_name)s,%(curr_version)s,%(file_desc)s,%(ft_id)s,%(op_time)s,%(login_id)s)
        """, file_dict)
    else:
        file_id = db.insertOne("""
          insert into pm.d_file(project_id, file_path_name, curr_version, file_desc, ft_id, create_time, create_login_id)
          values (%(project_id)s,%(file_path_name)s,1,%(file_desc)s,%(ft_id)s,%(op_time)s,%(login_id)s)
        """, file_dict)
        file_dict['file_id'] = file_id
        file_dict['curr_version'] = 1

    logger.debug(file_dict)
    db.insertOne(
        """insert into pm.d_file_his(file_id, project_id, file_path_name, version, file_desc, ft_id, create_time, create_login_id)
        select file_id, project_id, file_path_name, curr_version, file_desc, ft_id, create_time, create_login_id
        from pm.d_file where file_id=%(file_id)s""", file_dict)
    return file_dict


def get_file(project_id, ft_id, file_path_name, db):
    f = db.getOne("""select * from pm.d_file where project_id=%s and  ft_id=%s and file_path_name=%s""",
                  (project_id, ft_id, file_path_name))
    return f


def get_file_his(file_id):
    db = Mysql()
    r = db.getAll(
        'select * from pm.d_file_his a, pm.d_login b where a.create_login_id = b.login_id and file_id=%s order by a.version desc',
        (file_id,))
    db.dispose()
    return r
