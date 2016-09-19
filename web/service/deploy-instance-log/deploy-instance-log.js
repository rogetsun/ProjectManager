/**
 * Created by uv2sun on 16/9/19.
 */
angular.module('deploy-instance-log', [])
    .service('deployInstanceLog', ['uvWebsocket', '$q', '$mdDialog', function (uvWebsocket, $q, $mdDialog) {
        this.tail = function (di, n) {
            var d = $q.defer();
            uvWebsocket
                .websocket('ws://' + di.server_ip + ":9128/tail?logFile=" + di.di_log_shell + "&n=" + n)
                .onmessage(function (msgEvent) {
                    console.log(msgEvent);
                    var msg = JSON.parse(msgEvent.data);
                    d.resolve(msg);
                })
                .send(JSON.stringify({logFile: di.di_log_shell, n: n}));
            return d.promise;
        };
        this.show = function (di) {
            return $mdDialog.show({
                templateUrl: 'service/deploy-instance-log/deploy-instance-log.html',
                locals: {deployInstance: di},
                escapeToClose: false,
                resolve: {
                    logContent: ['deployInstanceLog', 'uvDialog', function (deployInstanceLog, uvDialog) {
                        return deployInstanceLog.tail(di, 100).then(function (msg) {
                            if (msg.msg_type == 'log') {
                                return msg.msg;
                            } else {
                                uvDialog.show('查看日志失败，' + msg.msg)
                            }
                        })
                    }]
                },
                controller: 'deploy-instance-logController'
            })
        };
    }])
    .controller('deploy-instance-logController', [
        '$scope', '$mdDialog', 'deployInstance', 'logContent', 'deployInstanceLog', 'uvDialog',
        function ($scope, $mdDialog, deployInstance, logContent, deployInstanceLog, uvDialog) {
            $scope.deployInstance = deployInstance;
            $scope.logContent = logContent;
            $scope.n = 100;
            $scope.closeDeployFileDialog = function () {
                $mdDialog.hide();
            };
            $scope.tail = function () {
                deployInstanceLog.tail(deployInstance, $scope.n).then(function (msg) {
                    if (msg.msg_type == 'log') {
                        $scope.logContent = msg.msg;
                    } else {
                        uvDialog.show('查看日志失败，' + msg.msg)
                    }
                });
            }
        }])
;