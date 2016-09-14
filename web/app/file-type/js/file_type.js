/**
 * Created by uv2sun on 16/6/13.
 */
angular.module('fileType', ['fileType.controller'])
;

angular.module('fileType.controller', [])
    .controller('fileTypeController', [
        '$scope', '$stateParams', '$mdDialog', 'uvTip', 'uvmAlert', 'fileTypeService',
        function ($scope, $stateParams, $mdDialog, uvTip, uvmAlert, fileTypeService) {
            console.log($scope.project);
            fileTypeService.getAllFileType($stateParams.project_id).then(function (res) {
                $scope.file_types = res.data;
            });
            $scope.defFileType = function ($event, fileType) {
                $mdDialog.show({
                    templateUrl: 'file_type_def_template',
                    controller: 'fileTypeDefController',
                    targetEvent: $event,
                    clickOutsideToClose: false,
                    locals: {ft: fileType || {}, project: $scope.project}
                }).then(function (res) {
                    if (res) {
                        uvTip.showTip((fileType ? '修改' : '添加') + '文件类型成功', 1000).then(function () {
                            $scope.reloadState();
                        })
                    }
                })
            };
        }
    ])
    .controller('fileTypeDefController', [
        '$scope', '$mdDialog', 'uvDialog', 'uvTip', 'fileTypeService', 'ft', 'project',
        function ($scope, $mdDialog, uvDialog, uvTip, fileTypeService, ft, project) {
            $scope.ft = ft;
            $scope.project = project;
            $scope.cancel = function () {
                $mdDialog.hide()
            };

            $scope.confirm = function () {
                fileTypeService.saveOrUpdateFileType(project.project_id, $scope.ft).then(function (res) {
                    console.log(res);
                    if (res && res.ret_code == 0) {
                        $mdDialog.hide(true);
                    } else {
                        uvDialog.show('操作失败,' + res.ret_msg);
                    }
                })
            };
            $scope.folderChange = function (folder, key) {
                if (folder) {
                    var f = folder.trim();
                    if (f == '/') {
                        f = '';
                    } else if (f != '/' && f) {
                        if (f.charAt(0) != '/') {
                            f = '/' + f;
                        }
                        if (f.charAt(f.length - 1) == '/') {
                            f = f.substr(0, f.length - 1);
                        }

                    }
                    $scope.ft[key || 'ft_folder'] = f;
                }
            };
        }
    ])
;