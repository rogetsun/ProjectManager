/**
 * Created by uv2sun on 16/6/13.
 */
angular.module('app.resource',
    [
        'resource.project', 'resource.user', 'resource.file_type', 'resource.file', 'resource.func'
    ]);
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
        }
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