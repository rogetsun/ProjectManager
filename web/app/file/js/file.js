/**
 * Created by uv2sun on 16/6/13.
 */
angular.module('file', ['file.controller']);

angular.module('file.controller', ['ngFileUpload'])
    .controller('filesController', [
        '$scope', '$mdDialog', 'uvmAlert', 'uvTip', '$stateParams', 'fileService', 'fileTypeService',
        function ($scope, $mdDialog, uvmAlert, uvTip, $stateParams, fileService, fileTypeService) {
            fileService.getAllFiles($stateParams.project_id).then(function (res) {
                $scope.files = res.data;
            });
            fileTypeService.getAllFileType($stateParams.project_id).then(function (res) {
                $scope.file_types = res.data;
                $scope.ftIDs = [];
                $scope.ftJSON = {};
                angular.forEach($scope.file_types, function (v) {
                    this.push(v.ft_id);
                    $scope.ftJSON[v.ft_id] = v;
                }, $scope.ftIDs);
                $scope.selectedFTIDs = angular.copy($scope.ftIDs);
            })
                .then(function () {
                    /**
                     * checkbox 初始化
                     * @param ftID
                     */
                    $scope.toggle = function (ftID) {
                        var idx = $scope.selectedFTIDs.indexOf(ftID);
                        if (idx > -1) {
                            $scope.selectedFTIDs.splice(idx, 1)
                        } else {
                            $scope.selectedFTIDs.push(ftID);
                        }
                    };
                    $scope.isExists = function (ftid) {
                        return $scope.selectedFTIDs.indexOf(ftid) > -1;
                    };
                    $scope.toggleAll = function () {
                        if ($scope.selectedFTIDs.length < $scope.ftIDs.length) {
                            $scope.selectedFTIDs = $scope.ftIDs.slice(0);
                        } else {
                            $scope.selectedFTIDs = [];
                        }
                    };
                    $scope.isChecked = function () {
                        return $scope.selectedFTIDs.length === $scope.ftIDs.length;
                    };
                    $scope.isIndeterminate = function () {
                        return $scope.selectedFTIDs.length > 0 && $scope.selectedFTIDs.length < $scope.ftIDs.length;
                    }
                });

            $scope.addFile = function ($event) {
                defFile($event).then(function (res) {
                    if (res) $scope.reloadState();
                });
            };
            // $scope.editFile = function ($event, file) {
            //     defFile($event, file).then(function (res) {
            //         if (res) $scope.reloadState();
            //     });
            // };


            function defFile($event, file) {
                return $mdDialog.show({
                    templateUrl: 'def_file_template',
                    targetEvent: $event,
                    locals: {file: file || {}, project: $scope.project},
                    controller: 'fileDefController'
                })
            }

            $scope.showFileHis = function ($event, f) {
                $mdDialog.show({
                    templateUrl: 'file_his_template',
                    targetEvent: $event,
                    locals: {file: f, ftJSON: $scope.ftJSON},
                    resolve: {
                        files: ['fileService', function (fileService) {
                            return fileService.getFileHis(f.file_id).then(function (res) {
                                return res.data;
                            })
                        }]
                    },
                    controller: 'fileHisController'
                })
            };

            $scope.orderFiles = function (key) {
                if ($scope.orderKey == key) {
                    $scope.orderReverse = !$scope.orderReverse;
                } else {
                    $scope.orderKey = key;
                    $scope.orderReverse = false;
                }
            };
            $scope.orderKey = 'file_path_name';
            $scope.orderReverse = false;
        }])

    .controller('fileDefController', [
        '$scope', '$mdDialog', 'Upload', 'uvTip', 'uvDialog', 'uvmAlert', 'fileService', 'fileTypeService', 'file', 'project',
        function ($scope, $mdDialog, Upload, uvTip, uvDialog, uvmAlert, fileService, fileTypeService, file, project) {
            $scope.file = file;
            $scope.project = project;
            $scope.cancel = function () {
                $mdDialog.hide();
            };
            $scope.loadFileType = function () {
                return fileTypeService.getAllFileType(project.project_id).then(function (res) {
                    $scope.file_types = res.data;
                })
            };

            $scope.confirm = function () {
                if (!$scope.ft) {
                    uvTip.showTip('请选择文件类型', 1000);
                    return;
                }
                if (!$scope.files || $scope.files.length == 0) {
                    uvTip.showTip('请选择文件', 1000);
                    return;
                }
                $scope.uploading = true;
                $scope.percent = 0;
                Upload.upload({
                    url: 'project/' + project.project_id + '/file',
                    data: {file: $scope.files, folder: $scope.folder || "", ft_id: $scope.ft.ft_id}
                }).then(function (resp) {
                    $scope.uploading = false;
                    var res = resp.data;
                    if (res && res.ret_code == 0) {
                        angular.forEach(res.data, function (value) {
                            this[value.file_name].version = value.curr_version;
                        }, $scope.filesJSON);
                        uvTip.showTip('上传成功!').then(function () {
                            $mdDialog.hide(true);
                        });
                    } else {
                        uvDialog.show('上传失败,' + res.ret_msg);
                    }
                }, function (resp) {
                    console.log('Error status: ' + resp.status);
                    console.log(resp);
                    uvDialog.show('上传失败,' + resp);
                    $scope.uploading = false;
                }, function (evt) {
                    $scope.percent = parseInt(100.0 * evt.loaded / evt.total);
                });
            };
            $scope.folderChange = function () {
                if ($scope.folder) {
                    if ($scope.folder.length > 0) {
                        if ($scope.folder.charAt(0) != '/')
                            $scope.folder = '/' + $scope.folder;
                        if ($scope.folder.charAt($scope.folder.length - 1) == '/') {
                            $scope.folder = $scope.folder.substr(0, $scope.folder.length - 1)
                        }
                    }
                }
                getFileInfo($scope.files);
            };
            $scope.$watch('ft', function () {
                getFileInfo($scope.files);
            });
            $scope.addFile = function ($files) {
                if (!$scope.ft) {
                    uvTip.showTip('请先选择文件类型');
                    return;
                }
                if (!$scope.files)$scope.files = [];
                if (!$scope.filesJSON) $scope.filesJSON = {};
                getFileInfo($files);
            };

            function getFileInfo(files) {
                angular.forEach(files, function (f) {
                    if ($scope.filesJSON[f.name]) {
                        delete $scope.filesJSON[f.name];
                        var idx = $scope.files.indexOf(f);
                        if (idx > -1) $scope.files.splice(idx, 1, f);
                    } else {
                        $scope.files.push(f);
                    }
                    $scope.filesJSON[f.name] = f;

                    fileService.getFile(project.project_id, $scope.ft.ft_id, $scope.folder || '', f.name).then(function (res) {
                        if (res && res.ret_code == 0) {
                            f.curr_version = res.data ? res.data.curr_version : '无';
                        }
                    });
                })
            }

            $scope.delFile = function (file) {
                if (file instanceof File) {
                    var idx = $scope.files.indexOf(file);
                    if (idx > -1) {
                        $scope.files.splice(idx, 1);
                    }
                    delete $scope.filesJSON[file.name];
                }
            }

        }])
    .controller('fileHisController', [
        '$scope', 'file', 'ftJSON', 'files', '$mdDialog',
        function ($scope, file, ftJSON, files, $mdDialog) {
            $scope.file = file;
            $scope.ftJSON = ftJSON;
            $scope.files = files;
            $scope.cancel = function () {
                $mdDialog.hide();
            };
        }])
;