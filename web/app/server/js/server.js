/**
 * Created by uv2sun on 16/9/10.
 */

angular.module('server', ['server.controller']);

angular.module('server.controller', [])
    .controller('serverListController', [
        '$scope', '$timeout', '$mdDialog', 'uvTip', 'serverService',
        function ($scope, $timeout, $mdDialog, uvTip, serverService) {
            $timeout(function () {
                serverService.getAllServers().then(function (res) {
                    $scope.servers = res.data;
                })
            });

            $scope.defServer = function ($event, server) {
                $mdDialog.show({
                    templateUrl: 'add_server_template',
                    controller: 'serverDefController',
                    targetEvent: $event,
                    locals: {server: server},
                    clickOutsideToClose: true
                }).then(function (res) {
                    if (res) {
                        uvTip.showTip("操作成功", 2000).then(function () {
                            $scope.reloadState();
                        });
                    }
                })
            };
        }
    ])
    .controller('serverDefController', [
        '$scope', '$mdDialog', 'serverService', 'uvDialog', 'server',
        function ($scope, $mdDialog, serverService, uvDialog, server) {
            $scope.server = server || {};
            $scope.cancel = function () {
                $mdDialog.hide();
            };
            $scope.confirm = function () {
                serverService.saveServer($scope.server).then(function (res) {
                    if (res.ret_code == 0) {
                        $mdDialog.hide(true);
                    } else {
                        uvDialog.show("保存失败," + res.ret_msg);
                    }
                }).catch(function (res) {
                    uvDialog.show("保存失败,[" + res.status + ']' + res.data)
                })
            }
        }
    ])

;