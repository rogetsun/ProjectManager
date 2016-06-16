# coding:utf-8
__author__ = 'uv2sun'


def mk_res(data=None, ret_code=0, ret_msg="success"):
    return {"ret_code": ret_code, "ret_msg": str(ret_msg), "data": data}
