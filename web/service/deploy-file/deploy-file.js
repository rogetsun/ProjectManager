/**
 * Created by uv2sun on 16/9/12.
 */
angular.module('deploy-file', [])
    .service('deployFileService', [
        '$mdDialog',
        function ($mdDialog) {
            /**
             *
             * @param projectID
             * @param files file数组，
             *      要求每个file都有ft_folder, ft_deploy_path, d_file表所有字段,部署的文件version或者max_version字段
             * @returns {promise}
             */
            this.show = function (projectID, files) {
                console.log(files);
                return $mdDialog.show({
                    templateUrl: 'service/deploy-file/deploy-file.html',
                    locals: {files: files, projectID: projectID},
                    escapeToClose: false,
                    resolve: {
                        deployInstances: ['deployInstanceService', function (deployInstanceService) {
                            return deployInstanceService.getDeployInstances(projectID).then(function (res) {
                                return res.data;
                            })
                        }]
                    },
                    controller: 'deploy-fileController'
                })
            };
        }
    ])

    .controller('deploy-fileController', [
        '$scope', 'deployFileService', 'files', 'projectID', '$mdDialog', 'uvDialog', 'uvWebsocket', 'deployInstances',
        'deployInstanceLog',
        function ($scope, deployFileService, files, projectID, $mdDialog, uvDialog, uvWebsocket, deployInstances,
                  deployInstanceLog) {
            $scope.files = files;
            $scope.filesJSON = {};
            angular.forEach($scope.files, function (f) {
                this[f.file_id] = f;
            }, $scope.filesJSON);
            $scope.deployInstances = deployInstances;
            $scope.closeDeployFileDialog = function () {
                $mdDialog.hide();
            };
            $scope.deploy = function () {
                $scope.deployStatus = '准备部署实例更新';
                var data = {deployInstance: $scope.deployInstance, files: files};
                $scope.deploying = 1;// 1代表部署中
                uvWebsocket.websocket('ws/project/' + projectID + '/deploy')
                    .onopen(function (event) {
                        console.log(event);
                    })
                    .onmessage(function (msgEvent) {
                        // console.log(msgEvent);
                        var msg = JSON.parse(msgEvent.data);
                        console.log(msg);
                        if (msg && msg.msg_type) {
                            if (msg.msg_type == 'status') {
                                $scope.deployStatus = 'status:' + msg.msg;
                            } else if (msg.msg_type == 'cmd_file') {
                                var f = msg.file;
                                $scope.deployStatus = 'deploy ' + f.file_path_name + " ok";
                                $scope.filesJSON[f.file_id].deployOK = 1;
                                $scope.focusFile = f;
                            } else if (msg.msg_type == 'cmd_over') {
                                $scope.deployStatus = 'ftp部署完毕';
                            } else if (msg.msg_type == 'cmd_err') {
                                uvDialog.show(msg.msg);
                                $scope.deploying = 3; //3代表失败
                                $scope.deployStatus = msg.msg;
                            } else if (msg.msg_type == 'cmd_end') {
                                $scope.deployStatus = "文件更新部署完毕!";
                                if ($scope.autoRestart) {
                                    console.log('自动重启实例');
                                    $scope.restartDeployInstance();
                                } else {
                                    console.log('不自动重启实例')
                                }
                                $scope.deploying = 2;//2代表成功
                            }
                            try {
                                $scope.$apply();
                            } catch (e) {
                            }
                        }
                    })
                    .onclose(function (event) {
                        console.log(event);
                        // if (event.code != 0) {
                        //     uvDialog.show(event.reason + "[" + event.code + "]");
                        //     $scope.deployStatus = event.reason + "[" + event.code + "]";
                        //     $scope.deploying = 3; //3代表失败
                        // } else {
                        //     $scope.deployStatus = "文件更新部署完毕!";
                        //     if ($scope.autoRestart) {
                        //         console.log('自动重启实例');
                        //         $scope.restartDeployInstance();
                        //     } else {
                        //         console.log('不自动重启实例')
                        //     }
                        //     $scope.deploying = 2;//2代表成功
                        //     try {
                        //         $scope.$apply();
                        //     } catch (e) {
                        //     }
                        // }
                    })
                    .send(JSON.stringify(data));
            };
            $scope.restartDeployInstance = function () {
                $scope.deployStatus = '开始重启应用实例，请稍等。。。';
                $scope.restarting = 1;
                uvWebsocket.websocket('ws://' + $scope.deployInstance.server_ip + ":9128/ws/exec")
                    .onopen(function (event) {
                        console.log(event);
                    })
                    .onmessage(function (msgEvent) {
                        var msg = JSON.parse(msgEvent.data);
                        console.log(msg);
                        if (msg.msg_type == 'status') {
                            $scope.deployStatus = msg.msg;
                        } else if (msg.msg_type == 'cmd_err') {
                            uvDialog.show('重启应用实例失败，' + msg.msg);
                            $scope.deployStatus = '重启应用实例失败！[' + msg.msg + ']';
                            $scope.restarting = 3;
                        } else if (msg.msg_type == 'cmd_end') {
                            $scope.deployStatus = '实例重启成功';
                            $scope.restarting = 2;
                        }
                        $scope.$apply();
                    })
                    .onclose(function (event) {
                        console.log(event);
                        // if (event.code == 0) {
                        //     $scope.deployStatus = '重启应用实例成功完成！';
                        //     $scope.restarting = 2;
                        //     try {
                        //         $scope.$apply();
                        //     } catch (e) {
                        //     }
                        // } else {
                        //     uvDialog.show('重启应用实例失败，exit=' + event.code + ", " + event.reason);
                        //     $scope.deployStatus = '重启应用实例失败！[' + event.code + ']';
                        //     $scope.restarting = 3;
                        //     try {
                        //         $scope.$apply();
                        //     } catch (e) {
                        //     }
                        // }
                    })
                    .send(JSON.stringify(
                        {
                            cmds: [
                                $scope.deployInstance.di_stop_shell,
                                $scope.deployInstance.di_start_shell
                            ]
                        }
                    ));
            };
            $scope.tailLog = function () {
                deployInstanceLog.show($scope.deployInstance);
            }
        }])
;