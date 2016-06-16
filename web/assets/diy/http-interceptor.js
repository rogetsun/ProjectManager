/**
 * Created by litx on 15/7/16.
 */
angular.module('util.httpInterceptor', ['uv.service.loading', 'uvm.service.alert'])
    .factory('myHttpInterceptor', ['$q', '$window', 'uvLoading', function ($q, $window, uvLoading) {
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
                // uvLoading.unloading();
                return response;
            },
            'responseError': function (response) {
                // uvLoading.unloading();
                if (response.status === 401) {
                    //TODO 转到登录页面
                    window.alert("登录过期,请重新登录");
                    window.location.href = "/";
                } else if (response.status == 403) {
                    console.log(response.data);
                    window.alert("登录过期,请重新登录");
                    window.location.href = "/";
                }
                return $q.reject(response);
            }
        };
    }])
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('myHttpInterceptor');
    }])
;