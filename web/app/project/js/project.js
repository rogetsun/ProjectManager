/**
 * Created by uv2sun on 16/6/13.
 */
angular.module('project', ['project.controller']);
angular.module('project.controller', [])
    .controller('projectListController', [
        '$scope', '$http', '$mdDialog', 'uvmAlert', 'projectService',
        function ($scope, $http, $mdDialog, uvmAlert, projectService) {
            projectService.getAllProject().then(function (res) {
                $scope.projects = res.data;
            });
            $scope.addProject = function ($event) {
                $mdDialog.show({
                    controller: 'addProjectController',
                    templateUrl: 'project_add_template',
                    targetEvent: $event,
                    clickOutsideToClose: false
                }).then(function (res) {
                    if (res) {
                        uvmAlert.alert('添加项目成功').then(function () {
                            $scope.reloadState();
                        })
                    }
                })
            }
        }
    ])
    .controller('addProjectController', [
        '$scope', '$mdDialog', 'projectService', 'uvDialog',
        function ($scope, $mdDialog, projectService, uvDialog) {
            $scope.cancel = function () {
                $mdDialog.hide();
            };
            $scope.confirm = function () {
                var project = {project_name: $scope.project_name, project_desc: $scope.project_desc};
                projectService.addProject(project).then(function (res) {
                    if (res && res.ret_code == 0) {
                        $mdDialog.hide(true);
                    } else {
                        uvDialog.show('添加失败,' + res.ret_msg);
                    }
                })
            }
        }])
    .controller('projectDetailController', [
        '$scope', 'uvmAlert', '$stateParams', '$state', 'projectService',
        function ($scope, uvmAlert, $stateParams, $state, projectService) {
            projectService.getProject($stateParams).then(function (res) {
                if (!res.data) {
                    uvmAlert.alert('项目不存在').then(function () {
                        $state.go('project.list')
                    })
                }
                $scope.project = res.data;
            })
        }
    ])
;