/**
 * Created by uv2sun on 16/4/18.
 */
angular.module('app.directive', [])
/**
 * 密码校验指令,scope[attrs['passwordRepeat']]取出另一个密码
 * 所以
 * <input ng-model='password_re'>
 * <input password-repeat='password_re' ng-model='user.password'>
 *
 *     eg:
 *     <md-input-container flex="50">
 <label>密码</label>
 <input type="password" ng-model="login_password_re" minlength="6" required maxlength="20"
 name="login_password_re">
 <div ng-messages="userForm.login_password_re.$error" ng-show="userForm.login_password_re.$dirty">
 <div ng-message="required">请输入密码</div>
 <div ng-message="maxlength">密码最长20位</div>
 <div ng-message="minlength">密码最短6位</div>
 </div>
 </md-input-container>
 <md-input-container flex="">
 <label>密码确认</label>
 <input type="password" ng-model="user.login_password" name="login_password"
 password-repeat="login_password_re">
 <div ng-messages="userForm.login_password.$error" ng-show="userForm.login_password.$dirty">
 <div ng-message="password_repeat">两次输入密码不一致</div>
 </div>
 </md-input-container>
 */
    .directive('pwdRepeat', [function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ctrl) {
                function diff() {
                    if (attrs['pwdRepeat'] != ctrl.$modelValue) {
                        ctrl.$setValidity("pwdRepeat", false);
                    } else {
                        ctrl.$setValidity("pwdRepeat", true);
                    }
                }

                ctrl.$viewChangeListeners.push(diff);
            }
        }
    }])
    .directive('md5Diff', [function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, elem, attr, ctrl) {
                var diff = function () {
                    if (attr['md5Diff'] == md5(ctrl.$modelValue)) {
                        ctrl.$setValidity("md5Diff", true);
                    } else {
                        ctrl.$setValidity("md5Diff", false);
                    }
                };
                ctrl.$viewChangeListeners.push(diff);
            }
        }
    }])
    .directive('rightCtrl', [function () {
        return {
            restrict: 'A',
            link: function (scope, elem, attr) {
                var rightCode = attr.rightCtrl || 0;
                if (rightCode == '0' && scope.currentLoginUser.role_id != '0') {
                    elem.hide();
                }
            }
        }
    }])
    .filter('uvIndexOf', function () {
        return function (o, key, array) {
            if (!array) return [];
            var r = [];
            angular.forEach(o, function (v) {
                if (array.indexOf(v[key]) > -1) this.push(v);
            }, r);
            return r;
        }
    })
;