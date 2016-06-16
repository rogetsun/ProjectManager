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
                $scope.funcList = [
                    // {func_id: 0, par_func_id: -1, func_name: $scope.project.project_name}
                    // , {func_id: 1, par_func_id: 0, func_name: '项目列表'}
                    // , {func_id: 2, par_func_id: 0, func_name: '项目管理'}
                    // , {func_id: 3, par_func_id: 2, func_name: '项目文件类型'}
                    // , {func_id: 4, par_func_id: 2, func_name: '项目文件'}
                    // , {func_id: 5, par_func_id: 2, func_name: '项目模块'}
                ];
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
                        if ($scope.editFunc.func_id) {
                            funcService.getFuncFiles($scope.editFunc.func_id).then(function (res) {
                                $scope.editFunc.ftFiles = res.data;
                                angular.forEach($scope.ftIDs, function (v) {
                                    // console.log(v);
                                    // console.log($scope.editFunc.ftFiles['' + v]);
                                    if (!$scope.editFunc.ftFiles['' + v]) {
                                        $scope.editFunc.ftFiles['' + v] = [];
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