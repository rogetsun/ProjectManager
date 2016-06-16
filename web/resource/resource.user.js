/**
 * Created by uv2sun on 16/6/13.
 */
angular.module('resource.user', [])
    .service('userService', ['$http', function ($http) {
        /**
         * 获取当前登录用户
         * @returns {HttpPromise}
         */
        this.currentUser = function () {
            return $http.get('current_user').then(function (res) {
                return res.data;
            })
        };

        /**
         * 修改当前用户密码
         * @param pwd
         * @returns {*|IPromise<TResult>}
         */
        this.modifyCurrentUserPassword = function (pwd) {
            pwd.new_password = md5(pwd.new_password);
            pwd.current_password = md5(pwd.current_password);
            return $http.put('modify_password', pwd).then(function (res) {
                return res.data;
            });
        };
    }]);