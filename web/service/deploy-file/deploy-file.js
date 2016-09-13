/**
 * Created by uv2sun on 16/9/12.
 */
angular.module('deploy-file', [])
    .service('deployFileService', [
        '$mdDialog', 'uvWebsocket',
        function ($mdDialog, uvWebsocket) {
            this.show = function (files) {
                // todo 打开 dialog 显示要部署文件，并开始 ftp 文件，然后重启实例
            }
        }
    ])
;