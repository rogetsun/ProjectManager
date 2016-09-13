/**
 * Created by uv2sun on 16/9/12.
 */
angular.module('deploy-file', [])
    .service('deployFileService', [
        '$mdDialog',
        function ($mdDialog) {
            this.show = function (projectID, files) {
                // todo 打开 dialog 显示要部署文件，并开始 ftp 文件，然后重启实例
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
        '$scope', 'deployFileService', 'files', 'projectID', '$mdDialog', 'uvWebsocket', 'deployInstances',
        function ($scope, deployFileService, files, projectID, $mdDialog, uvWebsocket, deployInstances) {
            $scope.files = files;
            $scope.deployInstances = deployInstances;
            $scope.closeDeployFileDialog = function () {
                $mdDialog.hide();
            };
            $scope.deploy = function () {
                var data = {deployInstance: $scope.deployInstance, files: files};
                uvWebsocket.websocket('ws/project/' + projectID + '/deploy')
                    .onopen(function (event) {
                        console.log('open');
                        console.log(event);
                    })
                    .onmessage(function (msg) {
                        console.log('message:');
                        console.log(msg);
                    })
                    .onclose(function (event) {
                        console.log('close');
                        console.log(event);
                    })
                    .send(JSON.stringify(data));
            };
        }])
;