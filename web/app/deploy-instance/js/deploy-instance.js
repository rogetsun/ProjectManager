/**
 * Created by uv2sun on 16/9/11.
 */

angular.module('deploy-instance', ['deploy-instance.controller']);
angular.module('deploy-instance.controller', [])
    .controller('deployInstanceController', [
        '$scope', '$timeout', '$mdSidenav', 'serverService', 'uvmAlert', 'deployInstanceService',
        function ($scope, $timeout, $mdSidenav, serverService, uvmAlert, deployInstanceService) {
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

        }
    ])
;