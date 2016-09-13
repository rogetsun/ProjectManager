/**
 * Created by uv2sun on 16/1/12.
 * 基于flipclock封装制作
 *
 * uvClockTimestamp: 开始时间戳,单位秒
 * uvClockCountdown: if (uvClockCountDown) 每秒-1; else 每秒+1
 * uvClockFace: 查看flipclock官方的clockFace,
 * uvClockStopCallback: 如果倒计时类,结束时触发flipclock的回调stop,此回调stop内会执行uvClockStopCallback绑定的function
 */
angular.module('uv.directive.clock', [])
    .directive('uvClock', ['$timeout', function ($timeout) {
        return {
            restrict: 'EA',
            replace: true,
            transclude: true,
            scope: {
                uvClockTimestamp: '@',
                uvClockCountdown: '@',
                uvClockFace: '@',
                uvClockStopCallback: '&',
                uvClockAutoStart: '@',
                uvClockShowText: '@'
            },
            link: function (scope, elem, attr) {
                var option = {
                    clockFace: scope.uvClockFace || 'TwentyFourHourClock',
                    autoStart: scope.uvClockAutoStart && true || false,
                    countdown: scope.uvClockCountdown && true || false,
                    language: scope.uvClockShowText && 'zh' || 'none',
                    callbacks: {
                        stop: function () {
                            console.log('uvClock stoped will callback:' + scope.uvClockStopCallback);
                            scope.uvClockStopCallback && scope.uvClockStopCallback();
                        },
                        onInterval: function () {

                        }
                    }
                };
                var clock = elem.FlipClock(option);
                if (!scope.uvClockAutoStart)
                    var watch = scope.$watch('uvClockTimestamp', function (v) {
                        if (v && parseInt(v) > 0) {
                            console.log("begin clock");
                            var times = scope.uvClockTimestamp;
                            clock.setTime(times);
                            clock.start();
                            watch();
                        } else {
                            console.log('uvClock:uv-clock-timestamp:' + scope.uvClockTimestamp + ",不满足开启时钟条件");
                        }
                    });

            }
        }
    }]);