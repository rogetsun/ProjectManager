/**
 * Created by uv2sun on 16/4/19.
 */
angular.module('uvm.service.alert', ['ngMaterial'])
    .service('uvmAlert', ['$mdDialog', '$timeout', function ($mdDialog, $timeout) {
        /**
         * 提示框 seconds秒后消失.
         * @param content
         * @param title
         * @param seconds
         */
        this.alert = function (content, title, seconds, $event) {
            var alert;

            function showAlert() {
                alert = $mdDialog.alert()
                    .title(title)
                    .textContent(content).targetEvent($event)
                    .ok('关闭');
                return $mdDialog
                    .show(alert)
                    .finally(function () {
                        alert = undefined;
                    });
            }

            if (seconds) {
                $timeout(function () {
                    if (alert)$mdDialog.hide();
                }, seconds * 1000);
            }
            return showAlert();
        };

        /**
         * 确定提示框,返回promise,如果promise对象resolve表示确定,reject表示取消
         * @param content
         * @param title
         * @returns {*}
         */
        this.confirm = function (content, title, $event) {
            var confirm;

            function showConfirm() {
                confirm = $mdDialog.confirm()
                    .title(title).textContent(content).targetEvent($event)
                    .ok('确定').cancel('取消');
                return $mdDialog.show(confirm)
                    .finally(function () {
                        confirm = null;
                    })
            }

            return showConfirm();
        };

        /**
         * 提示输入框
         * @param title
         * @param $event
         * @returns {*}
         */
        this.prompt = function (title, $event) {
            var prompt;

            function showPrompt() {
                prompt = $mdDialog.prompt()
                    // .title(title)
                    .textContent(title)
                    .targetEvent($event)
                    .ok('确定').cancel('取消');
                return $mdDialog.show(prompt)
                    .finally(function () {
                        prompt = null;
                    })
            }

            return showPrompt();
        }
    }]);