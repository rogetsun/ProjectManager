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