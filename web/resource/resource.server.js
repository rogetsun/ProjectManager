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