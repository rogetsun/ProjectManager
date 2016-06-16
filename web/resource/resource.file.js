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