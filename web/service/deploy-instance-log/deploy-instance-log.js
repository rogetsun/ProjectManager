/**
 * Created by uv2sun on 16/9/19.
 */
angular.module('deploy-instance-log')
    .service('deployInstanceLog', ['$http', '$mdDialog', function ($http, $mdDialog) {
        this.tail = function (di, n) {
            $http.get('http://' + di.server_ip + "/tail?log_file=" + di.di_log_shell + "&n=" + n).then(function (res) {
                return res.data;
            })
        };
        this.show = function (di) {

        }
    }]);