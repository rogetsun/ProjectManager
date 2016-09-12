/*!
 * projectmanager - JS for Debug
 * @licence projectmanager - v1.0.0 (2016-09-12)
 */
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
                $scope.di = di || $scope.di || {di_name: '实例' + ($scope.deployInstances.length + 1)};
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

                    if (f != '/' && f) {
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
/**
 * Created by uv2sun on 16/9/8.
 */

angular.module('file-his', [])
    .controller('fileHisController', [
        '$scope', '$stateParams', 'fileService', 'fileTypeService', '$mdDialog', 'file_id',
        function ($scope, $stateParams, fileService, fileTypeService, $mdDialog, file_id) {
            fileTypeService.getAllFileType($stateParams.project_id).then(function (res) {
                $scope.file_types = res.data;
                // $scope.ftIDs = [];
                $scope.ftJSON = {};
                angular.forEach($scope.file_types, function (v) {
                    // this.push(v.ft_id);
                    $scope.ftJSON[v.ft_id] = v;
                }, $scope.ftIDs);
                // $scope.selectedFTIDs = angular.copy($scope.ftIDs);
            });

            fileService.getFileHis(file_id).then(function (res) {
                $scope.files = res.data;
                $scope.file = $scope.files[$scope.files.length - 1];
            });

            $scope.cancel = function () {
                $mdDialog.hide();
            };
            /**
             * 下载指定文件指定版本
             * @param file_id
             * @param version
             */
            $scope.fileDownload = function (file_id, version) {
                window.open("file/dl/" + file_id + "/" + version);
            }
        }]);
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
                    templateUrl: 'app/file/template/file-his.html',
                    targetEvent: $event,
                    locals: {file_id: f.file_id},
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
                $scope.uploading = 1;
                $scope.percent = 0;
                var uploadingCount = 1;
                var uploadingFiles = [];
                var idx = 0;
                var uploading = function () {
                    if ($scope.uploading == 3) {
                        return;
                    }
                    if (uploadingFiles.length >= uploadingCount) {
                        console.log('waiting 100');
                        setTimeout(uploading, 100);
                        return;
                    }
                    if (idx >= $scope.files.length) {
                        console.log('上传马上完成');
                        if (uploadingFiles.length > 0) {
                            console.log('waiting 100');
                            setTimeout(uploading, 100);
                        } else {
                            console.log('over');
                            $scope.uploading = 2;
                            $scope.percent = 100;
                        }
                        return;
                    }
                    (function (idx) {
                        var file = $scope.files[idx];
                        uploadingFiles.push(file.name);
                        var fp = file.path ? file.path.substring(0, file.path.lastIndexOf("/")) : '';
                        Upload.upload({
                            url: 'project/' + project.project_id + '/file',
                            data: {file: file, folder: ($scope.folder || "") + "/" + fp, ft_id: $scope.ft.ft_id}
                        }).then(function (resp) {
                            uploadingFiles.splice(uploadingFiles.indexOf(file.name), 1);
                            var res = resp.data;
                            if (res && res.ret_code == 0) {
                                angular.forEach(res.data, function (value) {
                                    console.log(file.path || file.name);
                                    this[file.path || file.name].version = value.curr_version;
                                }, $scope.filesJSON);
                            } else {
                                uvDialog.show((file.path || file.name) + '上传失败,' + res.ret_msg);
                            }
                        }, function (resp) {
                            console.log('Error status: ' + resp.status);
                            console.log(resp);
                            uvDialog.show('上传失败,' + resp);
                            $scope.uploading = 3;
                        }, function (evt) {
                            var p = parseInt((idx / $scope.files.length) * 100);
                            $scope.percent = p + parseInt((100 / $scope.files.length) * (evt.loaded / evt.total));
                        });
                    })(idx++);
                    uploading();
                };
                uploading();
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
                    if ($scope.filesJSON[f.path || f.name]) {
                        delete $scope.filesJSON[f.path || f.name];
                        var idx = $scope.files.indexOf(f);
                        if (idx > -1) $scope.files.splice(idx, 1, f);
                    } else {
                        $scope.files.push(f);
                    }
                    $scope.filesJSON[f.path || f.name] = f;
                    var fp = f.path ? f.path.substring(0, f.path.lastIndexOf("/")) : '';
                    fileService.getFile(project.project_id, $scope.ft.ft_id, ($scope.folder || '') + '/' + fp, f.name).then(function (res) {
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

            $scope.finish = function () {
                $scope.$parent.reloadState();
                $mdDialog.hide();
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
            /**
             * 下载指定文件指定版本
             * @param file_id
             * @param version
             */
            $scope.fileDownload = function (file_id, version) {
                window.open("file/dl/" + file_id + "/" + version);
            }
        }])
;
/**
 * Created by uv2sun on 16/4/16.
 */

angular.module('main', ['main.controller']);

angular.module('main.controller', [])
    .controller('mainController', [
        '$rootScope', '$scope', '$state', '$timeout', '$mdDialog', '$templateCache', 'uvmAlert', 'userService',
        function ($rootScope, $scope, $state, $timeout, $mdDialog, $templateCache, uvmAlert, userService) {
            console.log('main.controller');
            userService.currentUser().then(function (res) {
                $scope.currentLoginUser = res.data;
            });


            $scope.fb = {isOpen: false};
            // $timeout(function () {
            //     $scope.fb.isOpen = false;
            // }, 100);

            $scope.logout = function () {
                uvmAlert.confirm('确定退出系统?').then(function () {
                    window.location = "logout";
                }, function () {
                    console.log('取消退出系统')
                })
            };

            $scope.modifyPassword = function (ev) {

                $mdDialog.show({
                    controller: 'modifyPwdController',
                    templateUrl: 'modify_password_template.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: false,
                    resolve: {
                        currentUser: function () {
                            return userService.currentUser().then(function (res) {
                                if (res && res.data) {
                                    return res.data;
                                } else {
                                    uvmAlert.alert("未知用户信息,请先退出系统,重新登录!").then(function () {
                                        window.location.href = "login";
                                    })
                                }
                            })
                        }
                    }
                }).then(function (res) {
                    if (res) uvmAlert.alert("修改密码成功,请重新登录!").then(function () {
                        window.location.href = "logout";
                    })
                })
            };

            $scope.$watch('currentStateName', function (stateName) {
                if (!stateName)return;
                $scope.currentState = $scope.treeStateJSON[stateName];
                console.log($scope.currentState);
                if ('main' == stateName.toString()) {//进入main主根state

                } else {
                    if ($scope.currentState.root_distance >= 1) {//进入页面顶部或以下菜单
                        $scope.currentStateTop = findStateNodeByRootDistance($scope.currentState, 1);
                        // console.log('currentStateL2');
                        // console.log($scope.currentStateL2);
                    }
                    if ($scope.currentState.root_distance >= 2) {//进入左侧或以下菜单
                        $scope.currentStateLeft = findStateNodeByRootDistance($scope.currentState, 2);
                        // console.log('currentStateL3');
                        // console.log($scope.currentStateL3);
                    } else {
                        $scope.currentStateLeft = {};
                    }
                    // else if ($scope.currentStateTop && $scope.currentStateTop.children && $scope.currentStateTop.children.length > 0) {
                    //     $scope.goState($scope.currentStateTop.children[0]);
                    // }

                }

            });
            /**
             * 查找state 父节点,且父节点root_distance == rd
             * @param state
             * @param rd root_distance
             * @returns {*}
             */
            function findStateNodeByRootDistance(state, rd) {
                var tmp = state;
                for (var i = state.root_distance; i >= rd; i--) {
                    if (tmp.root_distance == rd) {
                        break;
                    } else {
                        tmp = $scope.treeJSON[state.pid];
                    }
                }
                return tmp;
            }
        }])
    .controller('modifyPwdController', [
        '$scope', '$mdDialog', 'userService', 'currentUser',
        function ($scope, $mdDialog, userService, currentUser) {
            $scope.currentUser = currentUser;
            $scope.cancel = function () {
                $mdDialog.hide(false);
            };

            $scope.confirm = function () {
                if ($scope.pwdForm.$invalid) {
                    console.log('form valid failure');
                    return;
                }
                userService.modifyCurrentUserPassword({
                    current_password: $scope.curr_password,
                    new_password: $scope.new_password
                }).then(function (res) {
                    if (res && res.ret_code == 0) {
                        $mdDialog.hide(true);
                    } else {
                        uvmAlert.alert(res.ret_msg);
                    }
                })
            }
        }])
;
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
                /**
                 * 打开模块文件列表sidenav
                 * @param func
                 */
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

                /**
                 * 下载功能树上选中的模块
                 */
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

                /**
                 * 下载当前模块
                 */
                $scope.downCurrFunc = function () {
                    window.open('func/dl?fid=' + $scope.editFunc.func_id)
                };


                /**
                 * 查看文件历史版本信息
                 * @param $event
                 * @param f
                 */
                $scope.showFileHis = function ($event, f) {
                    $mdDialog.show({
                        templateUrl: 'app/file/template/file-his.html',
                        targetEvent: $event,
                        locals: {file_id: f.file_id},
                        controller: 'fileHisController'
                    })
                };

                /**
                 * 下载指定文件指定版本
                 * @param file_id
                 * @param version
                 */
                $scope.fileDownload = function (file_id, version) {
                    window.open("file/dl/" + file_id + "/" + version);
                }
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
                            if (
                                sfPath == (file.path || file.name) ||
                                (sfPath.indexOf(file.path || file.name) > -1 && sfPath.split(file.path || file.name)[1].length == 0)
                            )//文件匹配
                            {
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
                 * 上传单个文件
                 * @param func_id
                 * @param file editFunc.files[i] 数组中的某一个
                 */
                $scope.uploadFile = function (func_id, file) {
                    console.log("uploadFile," + arguments[2]);
                    file.uploadFlag = 1; //undefined or 0:未开始上传, 1:uploading, 2:upload ok, 3:upload error
                    $scope.uploadingFilesID.push(file.ff_id);
                    Upload.upload({
                        url: 'project/' + $scope.project.project_id + '/func/' + func_id + '/upd-file/' + file.ff_id,
                        data: {file: file.file, file_id: file.file_id}
                    }).then(function (resp) {
                        var res = resp.data;
                        if (res && res.ret_code == 0) {
                            file.uploadFlag = 2; //undefined or 0:未开始上传, 1:uploading, 2:upload ok, 3:upload error
                            file.curr_version = res.data.curr_version;
                            file.version = res.data.curr_version;
                        } else {
                            uvDialog.show('上传[' + file.file_path_name + ']失败,' + res.ret_msg);
                            file.uploadFlag = 3;
                        }
                    }, function (resp) {
                        console.log('Error status: ' + resp.status);
                        console.log(resp);
                        file.uploadFlag = 3; //undefined or 0:未开始上传, 1:uploading, 2:upload ok, 3:upload error
                        uvDialog.show('上传[' + file.file_path_name + ']失败,error status:' + resp.status);
                    }, function (evt) {
                        file.percentage = parseInt(100.0 * evt.loaded / evt.total);
                    })
                        .finally(function () {
                            console.log('finally');
                            $scope.uploadingFilesID.splice($scope.uploadingFilesID.indexOf(file.ff_id), 1);
                            file.isUpdate = 2;
                        });
                };
                /**
                 * 正在上传中的file的ff_id
                 * @type {Array}
                 */
                $scope.uploadingFilesID = [];
                $scope.uploadingCount = 1;//上传文件并发个数
                /**
                 * 上传所有更新文件
                 */
                $scope.uploadAllFiles = function () {
                    var idx = 0;
                    var toUp = function () {
                        if (idx < $scope.editFunc.files.length) {
                            if ($scope.uploadingFilesID.length >= $scope.uploadingCount) {
                                setTimeout(toUp, 200);
                                return;
                            }
                            for (var i = idx; i < $scope.editFunc.files.length; i++) {
                                var tmpFile = $scope.editFunc.files[i];
                                if ((tmpFile.isUpdate == 1 && tmpFile.uploadFlag != 1)
                                    || (tmpFile.isUpdate == 2 && tmpFile.uploadFlag == 3)) {
                                    idx = i + 1;
                                    console.log("upload " + tmpFile.file_path_name);
                                    $scope.uploadFile($scope.editFunc.func_id, tmpFile, 'from all');
                                    toUp();
                                    break;
                                }
                            }
                        }
                    };
                    toUp();
                };

            }
        }])
;

/**
 * Created by uv2sun on 16/6/15.
 */
angular.module('module', ['module.controller']);

angular.module('module.controller', [])
    .controller('moduleController', [
        '$scope', '$timeout', '$filter', '$mdSidenav', '$mdDialog', '$stateParams', 'uvTip', 'uvDialog', 'uvmAlert',
        'uvTree', 'fileTypeService', 'fileService', 'funcService',
        function ($scope, $timeout, $filter, $mdSidenav, $mdDialog, $stateParams, uvTip, uvDialog, uvmAlert,
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
                    if (!$scope.editFunc.ftFiles) {
                        $scope.editFunc.ftFiles = {};
                        if ($scope.editFunc.func_id) {
                            funcService.getFuncFiles($scope.editFunc.func_id).then(function (res) {
                                angular.forEach(res.data, function (v) {
                                    if (!$scope.editFunc.ftFiles[v.ft_id]) {
                                        $scope.editFunc.ftFiles[v.ft_id] = [];
                                    }
                                    $scope.editFunc.ftFiles[v.ft_id].push(v);
                                });

                                angular.forEach($scope.ftIDs, function (v) {
                                    // console.log(v);
                                    // console.log($scope.editFunc.ftFiles['' + v]);
                                    if (!$scope.editFunc.ftFiles[v]) {
                                        $scope.editFunc.ftFiles[v] = [];
                                    }
                                });
                            })
                        } else {
                            $scope.editFunc.ftFiles = {};
                            angular.forEach($scope.ftIDs, function (v) {
                                $scope.editFunc.ftFiles['' + v] = [];
                            });
                        }
                    }
                    $mdSidenav('func_def_sidenav').open();
                };
                $scope.exitFunc = function () {
                    $mdSidenav('func_def_sidenav').close();
                    delete $scope.editFunc;
                };

                /**
                 * 选择功能模块的上级模块
                 * @param selectedFuncID 默认选中的func_id
                 */
                $scope.selectFunc = function (selectedFuncID) {
                    $mdDialog.show({
                        templateUrl: 'select_func_template',
                        clickOutsideToClose: false, escapeToClose: false,
                        controller: 'selectFuncController',
                        locals: {selectedFuncID: selectedFuncID, funcs: angular.copy($scope.funcList)}
                    }).then(function (selectedFunc) {
                        if (selectedFunc) {
                            if ($scope.editFunc.func_id == selectedFunc.func_id) {
                                uvmAlert.alert('上级模块不可选择自己!');
                            } else {
                                var tmpFunc = selectedFunc;
                                while (tmpFunc.par_func_id != -1) {
                                    if (tmpFunc.par_func_id == $scope.editFunc.func_id) {
                                        uvmAlert.alert('上级模块不可选择本模块的子模块!');
                                        break;
                                    }
                                    tmpFunc = $scope.funcJSON[tmpFunc.par_func_id];
                                }
                                $scope.editFunc.par_func_id = selectedFunc.func_id;
                            }
                        }
                    });
                };

                /**
                 * 输入文件名称md-autocomplete搜索可选file过滤function
                 * @param list
                 * @param query
                 * @returns {*}
                 */
                $scope.searchFuncFiles = function (list, query) {
                    if (!list || list.length == 0) {
                        return []
                    }
                    var r = $filter('filter')(list, {file_path_name: query});
                    return r;
                };

                /**
                 * 保存功能模块和关联文件信息
                 */
                $scope.saveFunc = function () {
                    funcService.saveFunc($stateParams.project_id, $scope.editFunc).then(function (res) {
                        if (res && res.ret_code == 0) {
                            uvTip.showTip('保存成功!', 2000).then(function () {
                                $scope.exitFunc();
                            });
                            var ef = res.data;
                            if ($scope.funcJSON[ef.func_id]) {
                                $scope.funcJSON[ef.func_id] = ef;
                                for (var i = 0; i < $scope.funcList.length; i++) {
                                    if ($scope.funcList[i].func_id == ef.func_id) {
                                        $scope.funcList[i] = ef;
                                        break;
                                    }
                                }
                            } else {
                                $scope.funcJSON[ef.func_id] = ef;
                                $scope.funcList.push(ef);
                            }
                        } else {
                            uvmAlert.alert('保存失败,' + res.ret_msg);
                        }
                    })
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
                }

            }

            /**
             * bug相关代码
             */
            {
                $scope.defBug = function (bug) {
                    $scope.editBug = bug;
                    $mdSidenav('bug_def_sidenav').open();
                };
                $scope.exitBug = function () {
                    $mdSidenav('bug_def_sidenav').close();
                    delete $scope.editBug;
                };

            }
        }])

    .controller('selectFuncController', [
        '$scope', 'selectedFuncID', 'funcs', '$mdDialog', 'uvTree',
        function ($scope, selectedFuncID, funcs, $mdDialog, uvTree) {
            var treeName = $scope.parFuncSelectTreeName = '_funcsTree_';
            $scope.funcs = funcs;
            angular.forEach(funcs, function (v) {
                if (v.func_id == selectedFuncID) v.selected = true;
            });

            $scope.cancel = function () {
                $mdDialog.hide();
            };

            $scope.confirm = function () {
                var s = uvTree.getTree(treeName).getSelected();
                $mdDialog.hide(s);
            }
        }])
;
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