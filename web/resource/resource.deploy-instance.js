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

        this.saveDIFilePathMapping = function (projectID, di) {
            return $http.post('project/' + projectID + '/deploy-instance/' + di.di_id + '/file-path-mapping', di)
                .then(function (res) {
                    return res.data;
                })
        };

        this.getDIFilePathMapping = function (projectID, diID) {
            return $http.get('project/' + projectID + '/deploy-instance/' + diID + '/file-path-mapping')
                .then(function (res) {
                    return res.data;
                })
        }

    }]);