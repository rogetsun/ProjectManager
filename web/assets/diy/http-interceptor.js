/**
 * Created by litx on 15/7/16.
 */
angular.module('util.httpInterceptor', ['uv.service.loading', 'uvm.service.alert'])
    .provider('myHttpInterceptor', [function () {
        return {
            setLoginUrl: function (url) {
                this.login_url = url;
            },
            $get: ['$q', '$window', function ($q, $window) {
                var self = this;
                return {
                    // optional method
                    'request': function (config) {
                        if ($window.sessionStorage.Authorization) {
                            config.headers.Authorization = $window.sessionStorage.Authorization;
                        }
                        config.headers['Cache-Control'] = 'no-cache';
                        // uvLoading.loading();
                        return config;
                    },

                    'response': function (response) {
                        return response;
                    },
                    'responseError': function (response) {
                        if (response.status === 401) {
                            //TODO 转到登录页面
                            window.alert("登录过期,请重新登录");
                            window.location.href = self.login_url || "/";
                        } else if (response.status == 403) {
                            console.log(response.data);
                            window.alert("登录过期,请重新登录");
                            window.location.href = self.login_url || "/";
                        }
                        return $q.reject(response);
                    }
                };
            }]
        }
    }])
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('myHttpInterceptor');
    }])
;