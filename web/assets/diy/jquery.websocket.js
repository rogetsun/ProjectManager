/**
 * Created by uv2sun on 16/9/12.
 */
/**
 * Created by uv2sun on 15/11/23.
 */
;(function ($) {
    function WS(url, callbacks) {
        // var host = window.location.host;
        // var path = window.location.pathname;
        // var webp = path.substring(0, path.substring(1).indexOf("/") + 1);
        //var webp="/attendance";
        // this.websocket = new WebSocket("ws://" + host + webp + "/ws" + url);
        this.websocket = new WebSocket(url);

        var _this = this;
        if (callbacks) {
            if (callbacks.onmessage) {
                this.websocket.onmessage = function (event) {
                    callbacks.onmessage(event, _this.websocket);
                }
            }
            if (callbacks.onopen) {
                this.websocket.onopen = function (event) {
                    callbacks.onopen(event, _this.websocket);
                }
            }
            if (callbacks.onerror) {
                this.websocket.onerror = function (event) {
                    callbacks.onerror(event, _this.websocket);
                }
            }
            if (callbacks.onclose) {
                this.websocket.onclose = function (event) {
                    callbacks.onclose(event, _this.websocket);
                }
            }
        }
    }

    /**
     * 关闭websocket
     * @param code
     * @param reason
     */
    WS.prototype.close = function (code, reason) {
        this.websocket.close(code, reason);
    };

    WS.prototype.send = function (data) {
        this.websocket.send(data);
    };
    $.extend({
        websocket: function (url, callbacks) {
            return new WS(url, callbacks);
        }
    });


})(jQuery);