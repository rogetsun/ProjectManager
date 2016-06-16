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