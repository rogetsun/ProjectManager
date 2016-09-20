/**
 * Created by uv2sun on 16/9/20.
 */

angular.module('db-instance', [])
    .controller('dbInstanceController', [
        '$scope', 'dbInstanceService', '$stateParams', '$mdSidenav', 'uvTip', 'uvmAlert', '$mdDialog',
        function ($scope, dbInstanceService, $stateParams, $mdSidenav, uvTip, uvmAlert, $mdDialog) {
            $scope.title = 'db-instance';
            dbInstanceService.getDBInstances($stateParams.project_id).then(function (res) {
                if (res && res.ret_code == 0) {
                    $scope.dbInstances = res.data;
                }
            });

            /**
             * 定义数据库实例
             * @param dbInstance
             */
            $scope.defDBInstance = function (dbInstance) {
                if (dbInstance) {
                    $scope.di = dbInstance;
                } else {
                    if ($scope.di) {
                        if ($scope.di.db_id) {
                            $scope.di = {}
                        }
                    } else {
                        $scope.di = {}
                    }
                }
                $mdSidenav('di-def-sidenav').open()
            };

            $scope.saveDB = function () {
                dbInstanceService.saveDBInstance($stateParams.project_id, $scope.di).then(function (res) {
                    if (res && res.ret_code == 0) {
                        uvTip.showTip('保存数据库实例成功', 1000).then(function () {
                            $scope.reloadState();
                        });
                    } else {
                        uvmAlert.alert('保存数据库实例失败，' + res.ret_msg);
                    }
                })
            };

            $scope.openExecSqlDialog = function (di) {
                if (di)
                    $mdDialog.show({
                        templateUrl: 'exec-sql-dialog',
                        controller: 'execSqlController',
                        locals: {dbInstance: di}
                    })
            };

            $scope.delDBInstance = function (di) {
                dbInstanceService.delDBInstance($stateParams.project_id, di.db_id).then(function (res) {
                    if (res && res.ret_code == 0) {
                        uvTip.showTip('删除数据库实例成功！').then(function () {
                            $scope.reloadState();
                        })
                    } else {
                        uvmAlert.alert('删除失败，' + res.ret_msg);
                    }
                })
            }


        }])

    .controller('execSqlController', [
        '$scope', '$mdDialog', 'dbInstance', 'dbInstanceService', 'uvTip', 'uvDialog',
        function ($scope, $mdDialog, dbInstance, dbInstanceService, uvTip, uvDialog) {
            $scope.dbInstance = dbInstance;
            $scope.closeDialog = function () {
                $mdDialog.hide();
            };
            $scope.execSql = function () {

                if ($scope.sql) {
                    $scope.executing = 1;
                    dbInstanceService.execSql(dbInstance.db_id, $scope.sql).then(function (res) {
                        if (res && res.ret_code == 0) {
                            $scope.executing = 2;
                            uvTip.showTip('执行成功').then(function () {
                                $mdDialog.hide();
                            });
                        } else {
                            $scope.executing = 3;
                            uvDialog.show('执行失败，' + res.ret_msg);
                        }
                    })
                }
            }
        }])
;
