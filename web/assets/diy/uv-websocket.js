/**
 * Created by uv2sun on 16/9/12.
 */

angular.module('uv.service.websocket', [])
    .provider('uvWebsocket', [function () {
        var p = window.location.pathname;
        if (!p || p.length < 2) {
            p = "";
        } else {
            p = p.substring(1, p.substring(1).indexOf("/") + 1)
        }
        var config = {
            host: window.location.host,
            appName: p
        };
        this.setWSConfig = function (conf) {
            this._config = {};
            angular.extend(this._config, config, conf);
        };

        this.setWSHost = function (host) {
            if (!this._config) {
                this._config = config;
            }
            this._config.host = host;
        };
        this.setWSAppName = function (an) {
            if (!this._config) this._config = config;
            this._config.appName = an;
        };

        this.$get = ['$q', function ($q) {
            var _this = this;
            return {
                websocket: function (url) {
                    var su;
                    if (url.substr(0, 5) == 'ws://') {
                        su = url;
                    } else {
                        su = 'ws://' + _this._config.host + _this._config.appName + '/' + url;
                    }
                    console.log('ready to create websocket:' + su);
                    this.ws = $.websocket(su);
                    return this;
                },
                onopen: function (fn) {
                    var self = this;
                    this.ws.websocket.onopen = function (event) {
                        fn.call(self, event)
                    };
                    return this;
                },
                onmessage: function (fn) {
                    var self = this;
                    this.ws.websocket.onmessage = function (event) {
                        fn.call(self, event)
                    };
                    return this;
                },
                onerror: function (fn) {
                    var self = this;
                    this.ws.websocket.onerror = function (event) {
                        fn.call(self, event)
                    };
                    return this;
                },
                onclose: function (fn) {
                    var self = this;
                    this.ws.websocket.onclose = function (event) {
                        fn.call(self, event)
                    };
                    return this;
                },
                send: function (data) {
                    var d = $q.defer();
                    var thiz = this;
                    var sender = function () {
                        if (thiz.ws.websocket.readyState == 0) {
                            console.log('websocket.readyState:' + thiz.ws.websocket.readyState);
                            setTimeout(sender, 100);
                        } else if (thiz.ws.websocket.readyState == 1) {
                            thiz.ws.websocket.send(data);
                            d.resolve(thiz);
                        } else {
                            // throw new Error("websocket is closed");
                            d.reject("websocket is closed");
                        }
                    };
                    sender();
                    return d;
                },
                close: function (code, reason) {
                    this.ws.websocket.close(code, reason);
                }
            }
        }]

    }])
;