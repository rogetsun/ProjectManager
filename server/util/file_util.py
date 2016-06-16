# coding:utf-8
import os

from server.log_config import logger
from server.server_config import project_file_folder

__author__ = 'uv2sun'


def save_file(file_name, f):
    real_file = project_file_folder + os.path.sep + file_name
    logger.debug('save_file:real_file:%s' % (real_file,))
    folder = os.path.dirname(real_file)
    if not os.path.exists(folder):
        print 'path not exists'
        os.makedirs(os.path.dirname(real_file))
    if os.path.exists(real_file):
        os.remove(real_file)
    fp = open(real_file, 'wb')
    fp.write(f)
    fp.flush()
    fp.close()
