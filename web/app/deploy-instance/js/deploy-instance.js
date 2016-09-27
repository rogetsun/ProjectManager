/**
 * Created by uv2sun on 16/9/11.
 */

angular.module('deploy-instance', ['deploy-instance.controller']);
angular.module('deploy-instance.controller', [])
    .controller('deployInstanceController', [
        '$scope', '$timeout', '$mdSidenav', 'uvDialog', 'uvTip', 'uvWebsocket', 'serverService', 'uvmAlert', 'deployInstanceService', 'deployInstanceLog',
        function ($scope, $timeout, $mdSidenav, uvDialog, uvTip, uvWebsocket, serverService, uvmAlert, deployInstanceService, deployInstanceLog) {
            $timeout(function () {
                deployInstanceService.getDeployInstances($scope.project.project_id).then(function (res) {
                    $scope.deployInstances = res.data;
                });
                /**
                 * 获取主机列表信息
                 */
                serverService.getAllServers().then(function (res) {
                    $scope.servers = res.data;
                });
            });
            $scope.restartDeployInstance = function (di) {
                uvTip.showTip('开始重启应用实例，请稍等。。。');
                uvWebsocket.websocket('ws://' + di.server_ip + ":9128/ws/exec")
                    .onmessage(function (msgEvent) {
                        uvTip.hideTip();
                        var msg = JSON.parse(msgEvent.data);
                        if (msg.msg_type == 'status') {
                            uvTip.showTip(msg.msg);
                        } else if (msg.msg_type == 'cmd_err') {
                            uvDialog.show('重启应用实例失败，' + msg.msg);
                        } else if (msg.msg_type == 'cmd_end') {
                            uvTip.showTip('重启实例[' + di.di_name + '@' + di.server_ip + ']成功')
                        }
                        $scope.$apply();
                    })
                    .send(JSON.stringify(
                        {
                            cmds: [
                                di.di_stop_shell,
                                di.di_start_shell
                            ]
                        }
                    ));
            };
            /**
             * 部署实例列表
             * @type {Array}
             */
            $scope.dis = [];

            /**
             * 打开sidenav定义部署实例
             * @param di
             */
            $scope.defDI = function (di) {
                if (di) {
                    $scope.di = di;
                } else {
                    if ($scope.di) {
                        if ($scope.di.di_id) {
                            $scope.di = {di_name: '实例' + ($scope.deployInstances.length + 1)};
                        }
                    } else {
                        $scope.di = {di_name: '实例' + ($scope.deployInstances.length + 1)};
                    }
                }
                $mdSidenav('di-def-sidenav').open();
            };

            $scope.saveDI = function () {
                deployInstanceService.saveDeployInstance($scope.project.project_id, $scope.di).then(function (res) {
                    if (res && res.ret_code == 0) {
                        $scope.di.di_id = $scope.di.di_id || res.data.di_id;
                        $mdSidenav('di-def-sidenav').close();
                        uvmAlert.alert("实例保存成功!").then(function () {
                            $scope.reloadState();
                        })
                    } else {
                        uvmAlert.alert('保存失败,' + res.ret_msg);
                    }
                }).catch(function (res) {
                    uvmAlert.alert('保存失败,[' + res.status + ']' + res.data);
                });
            };


            $scope.catLog = function (di) {
                deployInstanceLog.show(di);
            }
        }
    ])
;