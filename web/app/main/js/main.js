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