# coding:utf-8
from server.db.db_pool import Mysql
from server.log_config import logger

__author__ = 'uv2sun'


def save_func(func, db):
    func.setdefault('par_func_id', '-1')
    # func.setdefault('func_code', '')

    if func.get('func_id') is not None:
        db.update(
            """update  pm.d_function set func_name = %s, par_func_id=%s , func_code=%s
                where func_id=%s
            """, (func.get('func_name'), func.get('par_func_id', -1), func.get('func_code', ''), func.get('func_id')))
        return func.get('func_id')
    else:
        # func_id = db.insertOne("""insert into pm.d_function (project_id, func_code, func_name, par_func_id, create_time, create_login_id)
        #     values(%s,%s,%s,%s,%s,%s)""",
        #                        (func.get('project_id'), func.get('func_code', -1), func.get('func_name', ''),
        #                         func.get('par_func_id'), func.get('op_time'), func.get('login_id'))
        #                        )
        func_id = db.insertOne("""insert into pm.d_function(project_id, func_code, func_name, par_func_id, create_time, create_login_id)
        values (%s,%s,%s,%s,%s,%s)""", (
            func.get('project_id'), func.get('func_code'), func.get('func_name'), func.get('par_func_id'),
            func.get('op_time'), func.get('login_id')))
        func['func_id'] = func_id
        return func_id


def save_func_file(func, ft_files, db):
    db.delete("""delete from pm.d_func_file where func_id=%(func_id)s""", func)
    # ft_files = func.get('ftFiles')
    logger.debug(ft_files)
    if ft_files is None:
        return
    for (idx, files) in ft_files.items():
        for f in files:
            f['op_time'] = func.get('op_time')
            f['login_id'] = func.get('login_id')
            f['func_id'] = func.get('func_id')
            if f.get('ff_id'):
                db.insertOne("""insert into pm.d_func_file(ff_id,func_id, file_id, file_version, op_time, op_login_id)
                values(%(ff_id)s,%(func_id)s,%(file_id)s,%(curr_version)s,%(op_time)s,%(login_id)s)""", f)
            else:
                ff_id = db.insertOne("""insert into pm.d_func_file(func_id, file_id, file_version, op_time, op_login_id)
                VALUES (%(func_id)s,%(file_id)s,%(curr_version)s,%(op_time)s,%(login_id)s)""", f)
                f['ff_id'] = ff_id


def select_all_func(project_id):
    db = Mysql()
    r = db.getAll("select * from pm.d_function where project_id=%s", (project_id,))
    db.dispose()
    return r


def select_func_files(func_id):
    db = Mysql()
    r = db.getAll("""select a.ff_id, a.func_id,a.file_version as curr_version, b.*
        from pm.d_func_file a, pm.d_file_his b
        where a.file_id=b.file_id and a.file_version = b.version and a.func_id=%s
        order by b.ft_id""", (func_id,))
    db.dispose()
    return r


def select_funcs_files(func_ids):
    db = Mysql()
    r = db.getAll("""select * from pm.d_file_his a, pm.d_func_file b, pm.d_file_type c
                where a.file_id=b.file_id and a.version = b.file_version
                and a.ft_id = c.ft_id and b.func_id in %s""", (func_ids,))
    db.dispose()
    return r
