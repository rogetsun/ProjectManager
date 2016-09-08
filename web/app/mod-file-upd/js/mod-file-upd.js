/**
 * Created by uv2sun on 16/9/7.
 */


angular.module("moduleFileUpdate", ['mfu']);
angular.module('mfu', ['mfu.controller']);
angular.module('mfu.controller', ['ngFileUpload'])
    .controller("moduleFileUpdateController", [
        '$scope', '$timeout', '$filter', '$mdSidenav', 'Upload', '$mdDialog', '$stateParams', 'uvTip', 'uvDialog', 'uvmAlert',
        'uvTree', 'fileTypeService', 'fileService', 'funcService',
        function ($scope, $timeout, $filter, $mdSidenav, Upload, $mdDialog, $stateParams, uvTip, uvDialog, uvmAlert,
                  uvTree, fileTypeService, fileService, funcService) {
            /**
             * 初始化获取功能列表,项目所有文件信息
             */
            $timeout(function () {
                $scope.funcList = [];
                funcService.getAllFuncs($stateParams.project_id).then(function (res) {
                    $scope.funcList = res.data;
                    $scope.funcJSON = {};
                    angular.forEach($scope.funcList, function (f) {
                        $scope.funcJSON[f.func_id] = f;
                    });
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

                fileService.getAllFiles($stateParams.project_id).then(function (res) {
                    $scope.allFiles = res.data;
                    $scope.ftFiles = {};
                    angular.forEach($scope.allFiles, function (file) {
                        if (!this[file.ft_id]) {
                            this[file.ft_id] = [];
                        }
                        this[file.ft_id].push(file);
                    }, $scope.ftFiles);
                })
            });

            /***
             * 功能模块相关代码
             */
            {
                $scope.treeName = 'defaultTree';
                $scope.defFunc = function (func) {
                    $scope.editFunc = angular.copy(func) || {};
                    if (!$scope.editFunc.files) {
                        if ($scope.editFunc.func_id) {
                            funcService.getFuncFiles($scope.editFunc.func_id).then(function (res) {
                                $scope.editFunc.files = res.data;
                                $scope.editFunc.filesJSON = {};
                                angular.forEach(res.data, function (f) {
                                    $scope.editFunc.filesJSON[f.ff_id] = f;
                                });
                            })
                        }
                    }
                    $mdSidenav('func_def_sidenav').open();
                };
                $scope.exitFunc = function () {
                    $mdSidenav('func_def_sidenav').close();
                    delete $scope.editFunc;
                };


                $scope.downloadFunc = function () {
                    var selectedFuncs = uvTree.getTree($scope.treeName).getSelected();
                    if (!selectedFuncs || selectedFuncs.length == 0) {
                        uvTip.showTip('请用复选框选择要下载的模块!', 2000);
                        return;
                    }
                    var fid = [];
                    angular.forEach(selectedFuncs, function (v) {
                        this.push(v.func_id);
                    }, fid);
                    window.open('func/dl?fid=' + fid.join(","))
                };

                $scope.downCurrFunc = function () {
                    window.open('func/dl?fid=' + $scope.editFunc.func_id)
                };

            }


            /**
             * 文件拖入上传相关代码
             */
            {
                $scope.updateFile = function ($files) {
                    var sfs = $scope.editFunc.files;
                    angular.forEach($files, function (file, idx) {
                        for (var i = 0; i < sfs.length; i++) {
                            var sfPath = $scope.ftJSON[sfs[i].ft_id].ft_folder + sfs[i].file_path_name;
                            if (sfPath.substr(0, 2) == "//") {
                                sfPath = sfPath.substr(1);
                            }
                            if (sfPath.indexOf(file.path || file.name) > -1) {
                                sfs[i].isUpdate = 1; //undefined or 0:未更新, 1:有更新且未上传, 2:更新上传完毕
                                sfs[i].file = file;
                                sfs[i].uploadFlag = 0;//undefined or 0:未开始上传, 1:uploading, 2:upload ok, 3:upload error
                            }
                        }
                    });

                };

                /**
                 * 取消单个文件上传更新
                 * @param ff_id
                 */
                $scope.cancelSingleUpload = function (f) {
                    delete f.isUpdate;
                    delete f.file;
                    delete f.uploadFlag;
                };

                /**
                 * 取消所有文件上传更新
                 */
                $scope.cancelAllUpload = function () {
                    angular.forEach($scope.editFunc.files, function (f) {
                        delete f.isUpdate;
                        delete f.file;
                        delete f.uploadFlag;
                    });
                };

                /**
                 * 正在上传中的file的ff_id
                 * @type {Array}
                 */
                $scope.uploadingFilesID = [];
                $scope.uploadingCount = 1;//上传文件并发个数
                /**
                 * 上传单个文件
                 * @param func_id
                 * @param file editFunc.files[i] 数组中的某一个
                 */
                $scope.uploadFile = function (func_id, file) {
                    file.uploadFlag = 1; //undefined or 0:未开始上传, 1:uploading, 2:upload ok, 3:upload error
                    Upload.upload({
                        url: 'project/' + $scope.project.project_id + '/func/' + func_id + '/upd-file/' + file.ff_id,
                        data: {file: file.file, file_id: file.file_id}
                    }).then(function (resp) {
                        var res = resp.data;
                        if (res && res.ret_code == 0) {
                            file.uploadFlag = 2; //undefined or 0:未开始上传, 1:uploading, 2:upload ok, 3:upload error
                            file.isUpdate = 2;
                            file.curr_version = res.data.curr_version;
                            file.version = res.data.curr_version;
                        } else {
                            uvDialog.show('上传失败,' + res.ret_msg);
                            file.uploadFlag = 3;
                        }
                    }, function (resp) {
                        console.log('Error status: ' + resp.status);
                        console.log(resp);
                        file.uploadFlag = 3; //undefined or 0:未开始上传, 1:uploading, 2:upload ok, 3:upload error
                        file.isUpdate = 2;
                        uvDialog.show('上传失败,' + resp);
                    }, function (evt) {
                        file.percentage = parseInt(100.0 * evt.loaded / evt.total);
                        console.log(file.file_path_name + ":" + percentage);
                    })
                        .finally(function () {
                            $scope.uploadingFilesID.splice($scope.uploadingFilesID.indexOf(file.ff_id), 1);
                        });
                };

                /**
                 * 上传所有更新文件
                 */
                $scope.uploadAllFiles = function () {
                    angular.forEach($filter("filter")($scope.editFunc.files, {isUpdate: true}), function (file) {
                        $scope.uploadFile($scope.editFunc.func_id, file);
                    });
                };

            }
        }])
;
