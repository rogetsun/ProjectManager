/**
 * Created by uv2sun on 16/9/12.
 */
angular.module('deploy-file', [])
    .service('deployFileService', [
        '$mdDialog',
        function ($mdDialog) {
            this.show = function (projectID, files) {
                return $mdDialog.show({
                    templateUrl: 'service/deploy-file/deploy-file.html',
                    locals: {files: files, projectID: projectID},
                    resolve: {
                        deployInstances: ['deployInstanceService', function (deployInstanceService) {
                            return deployInstanceService.getDeployInstances(projectID).then(function (res) {
                                return res.data;
                            })
                        }]
                    },
                    controller: 'deploy-fileController'
                })
            }
        }
    ])

    .controller('deploy-fileController', [
        '$scope', 'deployFileService', 'files', 'projectID', '$mdDialog', 'uvDialog', 'uvWebsocket', 'deployInstances',
        function ($scope, deployFileService, files, projectID, $mdDialog, uvDialog, uvWebsocket, deployInstances) {
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
                $scope.deploying = 1;
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
                                $scope.$apply();
                            } else if (msg.msg_type == 'cmd_file') {
                                var f = msg.file;
                                $scope.deployStatus = 'deploy ' + f.file_path_name + " ok";
                                $scope.filesJSON[f.file_id].deployOK = 1;
                                $scope.focusFile = f;
                                $scope.$apply();
                            } else if (msg.msg_type == 'cmd_over') {
                                $scope.deployStatus = 'ftp部署完毕';
                            }
                        }
                    })
                    .onclose(function (event) {
                        console.log(event);
                        if (event.code != 0) {
                            uvDialog.show(event.reason + "[" + event.code + "]");
                            $scope.deployStatus = event.reason + "[" + event.code + "]";
                        } else {
                            $scope.deployStatus = "文件更新部署完毕!";
                            $scope.$apply();
                            if ($scope.autoRestart) {
                                // todo restart deploy instance
                                console.log('自动重启实例')
                            } else {
                                console.log('不自动重启实例')
                            }
                            $scope.deploying = 2;
                        }
                    })
                    .send(JSON.stringify(data));
            };
        }])
;