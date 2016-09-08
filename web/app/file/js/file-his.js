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