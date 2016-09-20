/**
 * Created by uv2sun on 16/6/13.
 */
angular.module('app.resource',
    [
        'resource.project', 'resource.user', 'resource.file_type', 'resource.file', 'resource.func',
        'resource.server', 'resource.deploy-instance', 'resource.db-instance'
    ]);
/**
 * Created by uv2sun on 16/9/20.
 */

angular.module('resource.db-instance', [])
    .service('dbInstanceService', ['$http', function ($http) {

        this.getDBInstances = function (projectID) {
            return $http.get('project/' + projectID + '/db-instances').then(function (res) {
                return res.data;
            })
        };

        this.saveDBInstance = function (projectID, dbInstance) {
            return $http.post('project/' + projectID + '/db-instance', dbInstance).then(function (res) {
                return res.data;
            })
        };

        this.delDBInstance = function (projectID, db_id) {
            return $http.delete('project/' + projectID + '/db-instance/' + db_id).then(function (res) {
                return res.data;
            })
        };

        /**
         * 在数据库实例db_id上执行sql
         * @param db_id
         * @param sql
         * @returns {angular.IPromise<TResult>}
         */
        this.execSql = function (db_id, sql) {
            return $http.put('db-instance/' + db_id + '/execsql', sql).then(function (res) {
                return res.data;
            })
        }

    }]);
/**
 * Created by uv2sun on 16/9/11.
 */
angular.module('resource.deploy-instance', [])
    .service('deployInstanceService', ['$http', function ($http) {
        this.saveDeployInstance = function (projectID, di) {
            return $http.post('project/' + projectID + '/deploy-instance', di).then(function (res) {
                return res.data;
            })
        };

        this.getDeployInstances = function (projectID) {
            return $http.get('project/' + projectID + '/deploy-instances').then(function (res) {
                return res.data;
            })
        };

    }]);
/**
 * Created by uv2sun on 16/6/13.
 */
angular.module('resource.file_type', [])
    .service("fileTypeService", ['$http', function ($http) {
        this.getAllFileType = function (projectID) {
            return $http.get('project/' + projectID + '/file_type').then(function (res) {
                return res.data;
            });
        };

        this.saveOrUpdateFileType = function (projectID, fileType) {
            if (fileType.ft_id) {
                return $http.put('project/' + projectID + '/file_type', fileType).then(function (res) {
                    return res.data;
                })
            } else {
                return $http.post('project/' + projectID + '/file_type', fileType).then(function (res) {
                    return res.data;
                })
            }
        };
    }])
;
/**
 * Created by uv2sun on 16/6/13.
 */
angular.module('resource.file', [])
    .service('fileService', ['$http', function ($http) {
        this.getAllFiles = function (projectID) {
            return $http.get('project/' + projectID + '/files').then(function (res) {
                return res.data;
            });
        };
        this.getFileHis = function (fileID) {
            return $http.get('file/' + fileID + '/his').then(function (res) {
                return res.data;
            })
        };

        /**
         * 通过文件类型、目录、文件名称获取文件信息
         * @param project_id
         * @param ft_id
         * @param folder
         * @param file_name
         * @returns {*}
         */
        this.getFile = function (project_id, ft_id, folder, file_name) {
            return $http.get('project/' + project_id + '/ft/' + ft_id + '/file/' + encodeURI(file_name) + "?folder=" + folder).then(function (res) {
                return res.data;
            })
        };

        this.getFileHis = function (fileID) {
            return $http.get('file/' + fileID + '/his').then(function (res) {
                return res.data;
            })
        }

    }])
;
/**
 * Created by uv2sun on 16/6/16.
 */
angular.module('resource.func', [])
    .service('funcService', ['$http', function ($http) {
        this.saveFunc = function (projectID, func) {
            return $http.post('project/' + projectID + '/func', func).then(function (res) {
                return res.data;
            })
        };
        this.getAllFuncs = function (projectID) {
            return $http.get('project/' + projectID + '/funcs').then(function (res) {
                return res.data;
            });
        };

        this.getFuncFiles = function (func_id) {
            return $http.get('func/' + func_id + '/files').then(function (res) {
                return res.data;
            })
        };

        this.getFuncsFiles = function (func_id_arr) {
            return $http.get('funcs/files?fid=' + func_id_arr.join(',')).then(function (res) {
                return res.data;
            })
        };
    }])
;
/**
 * Created by uv2sun on 16/6/13.
 */
angular.module('resource.project', [])
    .service('projectService', ['$http', function ($http) {
        this.getAllProject = function () {
            return $http.get('projects').then(function (res) {
                return res.data;
            })
        };
        this.addProject = function (project) {
            if (project) {
                return $http.post('project', project).then(function (res) {
                    return res.data;
                });
            }
        };
        this.getProject = function (project) {
            if (project && project.project_id) {
                return $http.get('project/' + project.project_id).then(function (res) {
                    return res.data;
                })
            }
        }
    }])
;
/**
 * Created by uv2sun on 16/9/10.
 */

angular.module('resource.server', [])
    .service('serverService', ['$http', function ($http) {

        this.getAllServers = function () {
            return $http.get('servers').then(function (res) {
                return res.data;
            });
        };

        this.saveServer = function (server) {
            console.log(server);
            if (server.server_id) {//更新serer
                return $http.put('server', server).then(function (res) {
                    return res.data;
                })
            } else {//添加server
                return $http.post('server', server).then(function (res) {
                    return res.data;
                })
            }
        };

        /**
         * 获取server上的部署实例信息
         * @param serverID
         * @returns {IPromise<TResult>|*}
         */
        this.getServerDeployIntances = function (serverID) {
            return $http.get('server/' + serverID).then(function (res) {
                return res.data;
            });
        };


    }])
;
/**
 * Created by uv2sun on 16/6/13.
 */
angular.module('resource.user', [])
    .service('userService', ['$http', function ($http) {
        /**
         * 获取当前登录用户
         * @returns {HttpPromise}
         */
        this.currentUser = function () {
            return $http.get('current_user').then(function (res) {
                return res.data;
            })
        };

        /**
         * 修改当前用户密码
         * @param pwd
         * @returns {*|IPromise<TResult>}
         */
        this.modifyCurrentUserPassword = function (pwd) {
            pwd.new_password = md5(pwd.new_password);
            pwd.current_password = md5(pwd.current_password);
            return $http.put('modify_password', pwd).then(function (res) {
                return res.data;
            });
        };
    }]);