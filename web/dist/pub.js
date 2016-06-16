'use strict';
angular.module("ngLocale", [], ["$provide", function($provide) {
var PLURAL_CATEGORY = {ZERO: "zero", ONE: "one", TWO: "two", FEW: "few", MANY: "many", OTHER: "other"};
$provide.value("$locale", {
  "DATETIME_FORMATS": {
    "AMPMS": [
      "\u4e0a\u5348",
      "\u4e0b\u5348"
    ],
    "DAY": [
      "\u661f\u671f\u65e5",
      "\u661f\u671f\u4e00",
      "\u661f\u671f\u4e8c",
      "\u661f\u671f\u4e09",
      "\u661f\u671f\u56db",
      "\u661f\u671f\u4e94",
      "\u661f\u671f\u516d"
    ],
    "ERANAMES": [
      "\u516c\u5143\u524d",
      "\u516c\u5143"
    ],
    "ERAS": [
      "\u516c\u5143\u524d",
      "\u516c\u5143"
    ],
    "FIRSTDAYOFWEEK": 6,
    "MONTH": [
      "\u4e00\u6708",
      "\u4e8c\u6708",
      "\u4e09\u6708",
      "\u56db\u6708",
      "\u4e94\u6708",
      "\u516d\u6708",
      "\u4e03\u6708",
      "\u516b\u6708",
      "\u4e5d\u6708",
      "\u5341\u6708",
      "\u5341\u4e00\u6708",
      "\u5341\u4e8c\u6708"
    ],
    "SHORTDAY": [
      "\u5468\u65e5",
      "\u5468\u4e00",
      "\u5468\u4e8c",
      "\u5468\u4e09",
      "\u5468\u56db",
      "\u5468\u4e94",
      "\u5468\u516d"
    ],
    "SHORTMONTH": [
      "1\u6708",
      "2\u6708",
      "3\u6708",
      "4\u6708",
      "5\u6708",
      "6\u6708",
      "7\u6708",
      "8\u6708",
      "9\u6708",
      "10\u6708",
      "11\u6708",
      "12\u6708"
    ],
    "STANDALONEMONTH": [
      "\u4e00\u6708",
      "\u4e8c\u6708",
      "\u4e09\u6708",
      "\u56db\u6708",
      "\u4e94\u6708",
      "\u516d\u6708",
      "\u4e03\u6708",
      "\u516b\u6708",
      "\u4e5d\u6708",
      "\u5341\u6708",
      "\u5341\u4e00\u6708",
      "\u5341\u4e8c\u6708"
    ],
    "WEEKENDRANGE": [
      5,
      6
    ],
    "fullDate": "y\u5e74M\u6708d\u65e5EEEE",
    "longDate": "y\u5e74M\u6708d\u65e5",
    "medium": "y\u5e74M\u6708d\u65e5 ah:mm:ss",
    "mediumDate": "y\u5e74M\u6708d\u65e5",
    "mediumTime": "ah:mm:ss",
    "short": "yy/M/d ah:mm",
    "shortDate": "yy/M/d",
    "shortTime": "ah:mm"
  },
  "NUMBER_FORMATS": {
    "CURRENCY_SYM": "\u00a5",
    "DECIMAL_SEP": ".",
    "GROUP_SEP": ",",
    "PATTERNS": [
      {
        "gSize": 3,
        "lgSize": 3,
        "maxFrac": 3,
        "minFrac": 0,
        "minInt": 1,
        "negPre": "-",
        "negSuf": "",
        "posPre": "",
        "posSuf": ""
      },
      {
        "gSize": 3,
        "lgSize": 3,
        "maxFrac": 2,
        "minFrac": 2,
        "minInt": 1,
        "negPre": "-\u00a4\u00a0",
        "negSuf": "",
        "posPre": "\u00a4\u00a0",
        "posSuf": ""
      }
    ]
  },
  "id": "zh-cn",
  "localeID": "zh_CN",
  "pluralCat": function(n, opt_precision) {  return PLURAL_CATEGORY.OTHER;}
});
}]);

"use strict";angular.module("ngLocale",[],["$provide",function(e){var E={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};e.value("$locale",{DATETIME_FORMATS:{AMPMS:["上午","下午"],DAY:["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],ERANAMES:["公元前","公元"],ERAS:["公元前","公元"],FIRSTDAYOFWEEK:6,MONTH:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],SHORTDAY:["周日","周一","周二","周三","周四","周五","周六"],SHORTMONTH:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],STANDALONEMONTH:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],WEEKENDRANGE:[5,6],fullDate:"y年M月d日EEEE",longDate:"y年M月d日",medium:"y年M月d日 ah:mm:ss",mediumDate:"y年M月d日",mediumTime:"ah:mm:ss","short":"yy/M/d ah:mm",shortDate:"yy/M/d",shortTime:"ah:mm"},NUMBER_FORMATS:{CURRENCY_SYM:"¥",DECIMAL_SEP:".",GROUP_SEP:",",PATTERNS:[{gSize:3,lgSize:3,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,maxFrac:2,minFrac:2,minInt:1,negPre:"-¤ ",negSuf:"",posPre:"¤ ",posSuf:""}]},id:"zh-cn",localeID:"zh_CN",pluralCat:function(e,a){return E.OTHER}})}]);
//# sourceMappingURL=./angular-locale_zh-cn.min.js.map
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
// -----------------------------------------------------------------------
// Eros Fratini - eros@recoding.it
// jqprint 0.3
//
// - 19/06/2009 - some new implementations, added Opera support
// - 11/05/2009 - first sketch
//
// Printing plug-in for jQuery, evolution of jPrintArea: http://plugins.jquery.com/project/jPrintArea
// requires jQuery 1.3.x
//
// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
//------------------------------------------------------------------------

(function ($) {
    var opt;

    $.fn.jqprint = function (options) {
        opt = $.extend({}, $.fn.jqprint.defaults, options);

        var $element = (this instanceof jQuery) ? this : $(this);

        if (opt.operaSupport && $.browser.opera) {
            var tab = window.open("", "jqPrint-preview");
            tab.document.open();

            var doc = tab.document;
        }
        else {
            var $iframe = $("<iframe  />");

            if (!opt.debug) {
                $iframe.css({position: "absolute", width: "0px", height: "0px", left: "-600px", top: "-600px"});
            }

            $iframe.appendTo("body");
            var doc = $iframe[0].contentWindow.document;
        }

        if (opt.importCSS) {
            if ($("link[media=print]").length > 0) {
                $("link[media=print]").each(function () {
                    doc.write("<link type='text/css' rel='stylesheet' href='" + $(this).attr("href") + "' media='print' />");
                });
            }
            else {
                $("link").each(function () {
                    doc.write("<link type='text/css' rel='stylesheet' href='" + $(this).attr("href") + "' />");
                });
            }
        }

        if (opt.printContainer) {
            doc.write($element.outer());
        }
        else {
            $element.each(function () {
                doc.write($(this).html());
            });
        }

        doc.close();

        (opt.operaSupport && $.browser.opera ? tab : $iframe[0].contentWindow).focus();
        setTimeout(function () {
            (opt.operaSupport && $.browser.opera ? tab : $iframe[0].contentWindow).print();
            if (tab) {
                tab.close();
            }
        }, 1000);
    };

    $.fn.jqprint.defaults = {
        debug: false,
        importCSS: true,
        printContainer: true,
        operaSupport: false
    };

    // Thanks to 9__, found at http://users.livejournal.com/9__/380664.html
    jQuery.fn.outer = function () {
        return $($('<div></div>').html(this.clone())).html();
    }
})(jQuery);
function md5_binary(str) {
    var x = Array();
    var s11 = 7, s12 = 12, s13 = 17, s14 = 22;
    var s21 = 5, s22 = 9, s23 = 14, s24 = 20;
    var s31 = 4, s32 = 11, s33 = 16, s34 = 23;
    var s41 = 6, s42 = 10, s43 = 15, s44 = 21;

    var a = 0x67452301;
    var b = 0xefcdab89;
    var c = 0x98badcfe;
    var d = 0x10325476;

    var x = strToLittleEndianArray(str);

    var strBit = str.length * charBit;

    x[strBit >> 5] |= 0x80 << (strBit & 0x1f);
    x[(((strBit + 64) >>> 9) << 4) + 14] = strBit;

    var len = x.length;

    for (var k = 0; k < len; k += 16) {
        var aa = a, bb = b, cc = c, dd = d;
        a = ff(a, b, c, d, x[k + 0], s11, 0xd76aa478);
        d = ff(d, a, b, c, x[k + 1], s12, 0xe8c7b756);
        c = ff(c, d, a, b, x[k + 2], s13, 0x242070db);
        b = ff(b, c, d, a, x[k + 3], s14, 0xc1bdceee);
        a = ff(a, b, c, d, x[k + 4], s11, 0xf57c0faf);
        d = ff(d, a, b, c, x[k + 5], s12, 0x4787c62a);
        c = ff(c, d, a, b, x[k + 6], s13, 0xa8304613);
        b = ff(b, c, d, a, x[k + 7], s14, 0xfd469501);
        a = ff(a, b, c, d, x[k + 8], s11, 0x698098d8);
        d = ff(d, a, b, c, x[k + 9], s12, 0x8b44f7af);
        c = ff(c, d, a, b, x[k + 10], s13, 0xffff5bb1);
        b = ff(b, c, d, a, x[k + 11], s14, 0x895cd7be);
        a = ff(a, b, c, d, x[k + 12], s11, 0x6b901122);
        d = ff(d, a, b, c, x[k + 13], s12, 0xfd987193);
        c = ff(c, d, a, b, x[k + 14], s13, 0xa679438e);
        b = ff(b, c, d, a, x[k + 15], s14, 0x49b40821);
        a = gg(a, b, c, d, x[k + 1], s21, 0xf61e2562);
        d = gg(d, a, b, c, x[k + 6], s22, 0xc040b340);
        c = gg(c, d, a, b, x[k + 11], s23, 0x265e5a51);
        b = gg(b, c, d, a, x[k + 0], s24, 0xe9b6c7aa);
        a = gg(a, b, c, d, x[k + 5], s21, 0xd62f105d);
        d = gg(d, a, b, c, x[k + 10], s22, 0x2441453);
        c = gg(c, d, a, b, x[k + 15], s23, 0xd8a1e681);
        b = gg(b, c, d, a, x[k + 4], s24, 0xe7d3fbc8);
        a = gg(a, b, c, d, x[k + 9], s21, 0x21e1cde6);
        d = gg(d, a, b, c, x[k + 14], s22, 0xc33707d6);
        c = gg(c, d, a, b, x[k + 3], s23, 0xf4d50d87);
        b = gg(b, c, d, a, x[k + 8], s24, 0x455a14ed);
        a = gg(a, b, c, d, x[k + 13], s21, 0xa9e3e905);
        d = gg(d, a, b, c, x[k + 2], s22, 0xfcefa3f8);
        c = gg(c, d, a, b, x[k + 7], s23, 0x676f02d9);
        b = gg(b, c, d, a, x[k + 12], s24, 0x8d2a4c8a);
        a = hh(a, b, c, d, x[k + 5], s31, 0xfffa3942);
        d = hh(d, a, b, c, x[k + 8], s32, 0x8771f681);
        c = hh(c, d, a, b, x[k + 11], s33, 0x6d9d6122);
        b = hh(b, c, d, a, x[k + 14], s34, 0xfde5380c);
        a = hh(a, b, c, d, x[k + 1], s31, 0xa4beea44);
        d = hh(d, a, b, c, x[k + 4], s32, 0x4bdecfa9);
        c = hh(c, d, a, b, x[k + 7], s33, 0xf6bb4b60);
        b = hh(b, c, d, a, x[k + 10], s34, 0xbebfbc70);
        a = hh(a, b, c, d, x[k + 13], s31, 0x289b7ec6);
        d = hh(d, a, b, c, x[k + 0], s32, 0xeaa127fa);
        c = hh(c, d, a, b, x[k + 3], s33, 0xd4ef3085);
        b = hh(b, c, d, a, x[k + 6], s34, 0x4881d05);
        a = hh(a, b, c, d, x[k + 9], s31, 0xd9d4d039);
        d = hh(d, a, b, c, x[k + 12], s32, 0xe6db99e5);
        c = hh(c, d, a, b, x[k + 15], s33, 0x1fa27cf8);
        b = hh(b, c, d, a, x[k + 2], s34, 0xc4ac5665);
        a = ii(a, b, c, d, x[k + 0], s41, 0xf4292244);
        d = ii(d, a, b, c, x[k + 7], s42, 0x432aff97);
        c = ii(c, d, a, b, x[k + 14], s43, 0xab9423a7);
        b = ii(b, c, d, a, x[k + 5], s44, 0xfc93a039);
        a = ii(a, b, c, d, x[k + 12], s41, 0x655b59c3);
        d = ii(d, a, b, c, x[k + 3], s42, 0x8f0ccc92);
        c = ii(c, d, a, b, x[k + 10], s43, 0xffeff47d);
        b = ii(b, c, d, a, x[k + 1], s44, 0x85845dd1);
        a = ii(a, b, c, d, x[k + 8], s41, 0x6fa87e4f);
        d = ii(d, a, b, c, x[k + 15], s42, 0xfe2ce6e0);
        c = ii(c, d, a, b, x[k + 6], s43, 0xa3014314);
        b = ii(b, c, d, a, x[k + 13], s44, 0x4e0811a1);
        a = ii(a, b, c, d, x[k + 4], s41, 0xf7537e82);
        d = ii(d, a, b, c, x[k + 11], s42, 0xbd3af235);
        c = ii(c, d, a, b, x[k + 2], s43, 0x2ad7d2bb);
        b = ii(b, c, d, a, x[k + 9], s44, 0xeb86d391);

        a = modularAdd(a, aa);
        b = modularAdd(b, bb);
        c = modularAdd(c, cc);
        d = modularAdd(d, dd);
    }
    return Array(a, b, c, d);

    function f(x, y, z) {
        return (x & y) | ((~x) & z);
    };

    function g(x, y, z) {
        return (x & z) | (y & (~z));
    };

    function h(x, y, z) {
        return (x ^ y ^ z);
    };

    function i(x, y, z) {
        return (y ^ (x | (~z)));
    };

    function ff(a, b, c, d, x, s, ac) {
        return modularAdd(rotateLeft(modularAdd(a, modularAdd(modularAdd(f(b, c, d), x), ac)), s), b);
    };

    function gg(a, b, c, d, x, s, ac) {
        return modularAdd(rotateLeft(modularAdd(a, modularAdd(modularAdd(g(b, c, d), x), ac)), s), b);
    };

    function hh(a, b, c, d, x, s, ac) {
        return modularAdd(rotateLeft(modularAdd(a, modularAdd(modularAdd(h(b, c, d), x), ac)), s), b);
    };

    function ii(a, b, c, d, x, s, ac) {
        return modularAdd(rotateLeft(modularAdd(a, modularAdd(modularAdd(i(b, c, d), x), ac)), s), b);
    };
};

function md5(str) {
    return littleEndianArrayToHex(md5_binary(str));
};
/**
 * Add binary-safe padding to a string.
 *
 * @param string the string to add padding
 * @param int number for the string be divisible by
 * @param int the string length
 * @return the padded string
 * @author www.farfarfar.com
 * @version 0.2
 */


var charBit = 8;

var standardPadding = false;

function addPadding(str, divisible, len) {
    if (divisible % len != 0)
        var paddingLen = divisible - (len % divisible);
    else
        var paddingLen = 0;

    if (standardPadding) {
        for (var i = 0; i < paddingLen; i++) {
            str += String.fromCharCode(paddingLen);
        }
    } else {
        for (var i = 0; i < paddingLen; i++) {
            str += String.fromCharCode(0);
        }
    }

    return str;
};

/**
 * Remove binary-safe padding from a string
 *
 * @param string the string to remove padding
 * @param int the string length
 * @return the unpadded string
 * @author www.farfarfar.com
 * @version 0.1
 */

function removePadding(str, len) {
    if (standardPadding) {
        return str.substr(0, len - (str.charCodeAt(str.length - 1)));
    } else {
        return str;
    }
};

/**
 * Converts a string into a little endian binary array
 *
 * @param string the string to convert
 * @return int[]
 * @author www.farfarfar.com
 * @version 0.1
 */

function strToLittleEndianArray(str) {
    var x = Array();
    var mask = (1 << charBit) - 1;

    var len = str.length;

    for (var i = 0, j = 0; j < len; i += charBit) {
        x[i >> 5] |= (str.charCodeAt(j++) & mask) << (i & 0x1f);
    }

    return x;
};

/**
 * Converts a string into a big endian binary array
 *
 * @param string the string to convert
 * @return int[]
 * @author www.farfarfar.com
 * @version 0.1
 */

function strToBigEndianArray(str) {
    var x = Array();
    var mask = (1 << charBit) - 1;

    var len = str.length;

    var i = 0;

    for (var j = 0; j < len; i += charBit) {
        x[i >> 5] |= (str.charCodeAt(j++) & mask) << (32 - charBit - (i & 0x1f));
    }

    return x;
};

/**
 * Converts a little endian binary array into a hex-formatted string
 *
 * @param int[] the array to convert
 * @return string
 * @author www.farfarfar.com
 * @version 0.1
 */

function littleEndianArrayToHex(ar) {
    var charHex = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f');

    var str = "";

    var len = ar.length;

    for (var i = 0, tmp = len << 2; i < tmp; i++) {
        str += charHex[((ar[i >> 2] >> (((i & 3) << 3) + 4)) & 0xF)] +
            charHex[((ar[i >> 2] >> ((i & 3) << 3)) & 0xF)];
    }

    return str;
};

/**
 * Converts a big endian binary array into a hex-formatted string
 *
 * @param int[] the array to convert
 * @return string
 * @author www.farfarfar.com
 * @version 0.1
 */

function bigEndianArrayToHex(ar) {
    var charHex = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f');

    var str = "";

    var len = ar.length;

    for (var i = 0, tmp = len << 2; i < tmp; i++) {
        str += charHex[((ar[i >> 2] >> (((3 - (i & 3)) << 3) + 4)) & 0xF)] +
            charHex[((ar[i >> 2] >> ((3 - (i & 3)) << 3)) & 0xF)];
    }

    return str;
};

/**
 * @param int the integer to rotate
 * @param int the distance to rotate left
 * @return int
 */

function rotateLeft(val, n) {
    return (val << n) | (val >>> (32 - n));
};

/**
 * @param int the integer to rotate
 * @param int the distance to rotate right
 * @return int
 */

function rotateRight(val, n) {
    return ( val >>> n ) | (val << (32 - n));
};

/**
 * @param int the first integer
 * @param int the second integer
 * @return int
 */

function modularAdd(a, b) {
    var lowerSum = (a & 0xffff) + (b & 0xffff);
    var upperSum = (a >> 16) + (b >> 16) + (lowerSum >> 16);
    return (upperSum << 16) + (lowerSum & 0xffff);
};

/**
 * @param int the first integer
 * @param int the second integer
 * @return int
 */

function modularSubtract(a, b) {
    return modularAdd(a, -b);
};

function binxor(l, r) {
    var x = ((l < 0) ? (l + 4294967296) : l)
        ^ ((r < 0) ? (r + 4294967296) : r);
    return ((x < 0) ? x + 4294967296 : x);
};

/**
 * Unencodes a hex-encoded string to a binary string
 * @param str the string to unencode
 * @return string the unencoded string
 * @author www.farfarfar.com
 */

function hexToStr(str) {
    var charHex = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f');
    var stringHex = "0123456789abcdef";

    var out = "";
    var len = str.length;
    str = new String(str);
    str = str.toLowerCase();
    if ((len % 2) == 1) {
        str += "0";
    }
    for (var i = 0; i < len; i += 2) {
        var s1 = str.substr(i, 1);
        var s2 = str.substr(i + 1, 1);
        var index1 = stringHex.indexOf(s1);
        var index2 = stringHex.indexOf(s2);

        if (index1 == -1 || index2 == -1) {
            throw HEX_BROKEN;
        }

        var val = (index1 << 4) | index2;

        out += "" + String.fromCharCode(parseInt(val));
    }
    return out;
};

/**
 * Encodes a string string to a hex-encoded string
 * @param str the string to unencode
 * @return string the unencoded string
 * @author www.farfarfar.com
 */

function strToHex(str) {
    var charHex = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f');

    var out = "";
    var len = str.length;
    str = new String(str);
    for (var i = 0; i < len; i++) {
        var s = str.charCodeAt(i);
        var h = "" + charHex[s >> 4] + "" + charHex[0xf & s];

        out += "" + h;
    }
    return out;
};

/**
 * Converts a string to an array of longs
 *
 * @param string the string to convert
 * @return long[]
 * @version 0.1
 */
function strToInt(str) {
    var ar = new Array();

    var len = str.length;

    var i = 0;
    var j = 0;

    do {
        ar[j++] = str.charCodeAt(i++) +
            (str.charCodeAt(i++) << 8) +
            (str.charCodeAt(i++) << 16) +
            (str.charCodeAt(i++) << 24);
    } while (i < len);

    return ar;
};

/**
 * Converts an array of longs to a string
 *
 * @param long[] the array to convert
 * @return string
 * @version 0.1
 */

function intToStr(ar) {
    var len = ar.length;
    for (var i = 0; i < len; i++) {
        ar[i] = String.fromCharCode(ar[i] & 0xff, ar[i] >>> 8 & 0xff,
            ar[i] >>> 16 & 0xff, ar[i] >>> 24 & 0xff);
    }
    return ar.join('');
};



/**
 * Created by uv2sun on 16/6/13.
 */
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
};

String.prototype.ltrim = function () {
    return this.replace(/(^\s*)/g, "");
};

String.prototype.rtrim = function () {
    return this.replace(/(\s*$)/g, "");
};
/*!
 * Cropper v0.7.2
 * https://github.com/fengyuanchen/cropper
 *
 * Copyright 2014 Fengyuan Chen
 * Released under the MIT license
 */

(function (factory) {
  if (typeof define === "function" && define.amd) {
    // AMD. Register as anonymous module.
    define(["jquery"], factory);
  } else {
    // Browser globals.
    factory(jQuery);
  }
})(function ($) {

  "use strict";

  var $window = $(window),
      $document = $(document),

      // Constants
      TRUE = true,
      FALSE = false,
      NULL = null,
      NAN = NaN,
      INFINITY = Infinity,
      STRING_UNDEFINED = "undefined",
      STRING_DIRECTIVE = "directive",
      CROPPER_NAMESPACE = ".cropper",

      // RegExps
      REGEXP_DIRECTIVES = /^(e|n|w|s|ne|nw|sw|se|all|crop|move|zoom)$/,
      REGEXP_OPTIONS = /^(x|y|width|height)$/,
      REGEXP_PROPERTIES = /^(naturalWidth|naturalHeight|width|height|aspectRatio|ratio)$/,

      // Classes
      CLASS_MODAL = "cropper-modal",
      CLASS_HIDDEN = "cropper-hidden",
      CLASS_INVISIBLE = "cropper-invisible",
      CLASS_MOVE = "cropper-move",
      CLASS_CROP = "cropper-crop",
      CLASS_DISABLED = "cropper-disabled",

      // Events
      EVENT_MOUSE_DOWN = "mousedown touchstart",
      EVENT_MOUSE_MOVE = "mousemove touchmove",
      EVENT_MOUSE_UP = "mouseup mouseleave touchend touchleave touchcancel",
      EVENT_WHEEL = "wheel mousewheel DOMMouseScroll",
      EVENT_RESIZE = "resize" + CROPPER_NAMESPACE, // Bind to window with namespace
      EVENT_DBLCLICK = "dblclick",
      EVENT_BUILD = "build" + CROPPER_NAMESPACE,
      EVENT_BUILT = "built" + CROPPER_NAMESPACE,
      EVENT_DRAG_START = "dragstart" + CROPPER_NAMESPACE,
      EVENT_DRAG_MOVE = "dragmove" + CROPPER_NAMESPACE,
      EVENT_DRAG_END = "dragend" + CROPPER_NAMESPACE,

      // Functions
      isNumber = function (n) {
        return typeof n === "number";
      },

      // Constructor
      Cropper = function (element, options) {
        this.element = element;
        this.$element = $(element);
        this.defaults = $.extend({}, Cropper.DEFAULTS, $.isPlainObject(options) ? options : {});
        this.$original = NULL;
        this.ready = FALSE;
        this.built = FALSE;
        this.cropped = FALSE;
        this.rotated = FALSE;
        this.disabled = FALSE;
        this.replaced = FALSE;
        this.init();
      },

      // Others
      round = Math.round,
      sqrt = Math.sqrt,
      min = Math.min,
      max = Math.max,
      abs = Math.abs,
      sin = Math.sin,
      cos = Math.cos,
      num = parseFloat;

  Cropper.prototype = {
    constructor: Cropper,

    support: {
      canvas: $.isFunction($("<canvas>")[0].getContext)
    },

    init: function () {
      var defaults = this.defaults;

      $.each(defaults, function (i, n) {
        switch (i) {
          case "aspectRatio":
            defaults[i] = abs(num(n)) || NAN; // 0 -> NaN
            break;

          case "minWidth":
          case "minHeight":
            defaults[i] = abs(num(n)) || 0; // NaN -> 0
            break;

          case "maxWidth":
          case "maxHeight":
            defaults[i] = abs(num(n)) || INFINITY; // NaN -> Infinity
            break;

          // No default
        }
      });

      // Set default image data
      this.image = {
        rotate: 0
      };

      this.load();
    },

    load: function () {
      var _this = this,
          $this = this.$element,
          element = this.element,
          image = this.image,
          $clone,
          url;

      if ($this.is("img")) {
        url = $this.attr("src");
      } else if ($this.is("canvas") && this.support.canvas) {
        url = element.toDataURL();
      }

      if (!url) {
        return;
      }

      if (this.$clone) {
        this.$clone.remove();
      }

      // Reset image rotate degree
      if (this.replaced) {
        this.replaced = FALSE;
        image.rotate = 0;
      }

      this.$clone = ($clone = $('<img src="' + url + '">'));

      $clone.one("load", function () {
        image.naturalWidth = this.naturalWidth || $clone.width();
        image.naturalHeight = this.naturalHeight || $clone.height();
        image.aspectRatio = image.naturalWidth / image.naturalHeight;

        _this.url = url;
        _this.ready = TRUE;
        _this.build();
      });

      // Hide and prepend the clone iamge to the document body (Don't append to).
      $clone.addClass(CLASS_INVISIBLE).prependTo("body");
    },

    build: function () {
      var $this = this.$element,
          defaults = this.defaults,
          buildEvent,
          $cropper;

      if (!this.ready) {
        return;
      }

      if (this.built) {
        this.unbuild();
      }

      $this.one(EVENT_BUILD, defaults.build); // Only trigger once
      buildEvent = $.Event(EVENT_BUILD);
      $this.trigger(buildEvent);

      if (buildEvent.isDefaultPrevented()) {
        return;
      }

      // Create cropper elements
      this.$cropper = ($cropper = $(Cropper.TEMPLATE));

      // Hide the original image
      $this.addClass(CLASS_HIDDEN);

      // Show and prepend the clone iamge to the cropper
      this.$clone.removeClass(CLASS_INVISIBLE).prependTo($cropper);

      // Save original image for rotation
      if (!this.rotated) {
        this.$original = this.$clone.clone();
        this.originalImage = $.extend({}, this.image);
      }

      this.$container = $this.parent();
      this.$container.append($cropper);

      this.$canvas = $cropper.find(".cropper-canvas");
      this.$dragger = $cropper.find(".cropper-dragger");
      this.$viewer = $cropper.find(".cropper-viewer");

      defaults.autoCrop ? (this.cropped = TRUE) : this.$dragger.addClass(CLASS_HIDDEN);
      defaults.dragCrop && this.setDragMode("crop");
      defaults.modal && this.$canvas.addClass(CLASS_MODAL);
      !defaults.dashed && this.$dragger.find(".cropper-dashed").addClass(CLASS_HIDDEN);
      !defaults.movable && this.$dragger.find(".cropper-face").addClass(CLASS_HIDDEN);
      !defaults.resizable && this.$dragger.find(".cropper-line, .cropper-point").addClass(CLASS_HIDDEN);

      this.$scope = defaults.multiple ? this.$cropper : $document;

      this.addListeners();
      this.initPreview();

      this.built = TRUE;
      this.update();

      $this.one(EVENT_BUILT, defaults.built); // Only trigger once
      $this.trigger(EVENT_BUILT);
    },

    unbuild: function () {
      if (!this.built) {
        return;
      }

      this.built = FALSE;
      this.removeListeners();

      this.$preview.empty();
      this.$preview = NULL;

      this.$dragger = NULL;
      this.$canvas = NULL;
      this.$container = NULL;

      this.$cropper.remove();
      this.$cropper = NULL;
    },

    update: function (data) {
      this.initContainer();
      this.initCropper();
      this.initImage();
      this.initDragger();

      if (data) {
        this.setData(data, TRUE);
        this.setDragMode("crop");
      } else {
        this.setData(this.defaults.data);
      }
    },

    resize: function () {
      clearTimeout(this.resizing);
      this.resizing = setTimeout($.proxy(this.update, this, this.getData()), 200);
    },

    preview: function () {
      var image = this.image,
          dragger = this.dragger,
          width = image.width,
          height = image.height,
          left = dragger.left - image.left,
          top = dragger.top - image.top;

      this.$viewer.find("img").css({
        width: round(width),
        height: round(height),
        marginLeft: -round(left),
        marginTop: -round(top)
      });

      this.$preview.each(function () {
        var $this = $(this),
            ratio = $this.width() / dragger.width;

        $this.find("img").css({
          width: round(width * ratio),
          height: round(height * ratio),
          marginLeft: -round(left * ratio),
          marginTop: -round(top * ratio)
        });
      });
    },

    addListeners: function () {
      var defaults = this.defaults;

      this.$element.on(EVENT_DRAG_START, defaults.dragstart).on(EVENT_DRAG_MOVE, defaults.dragmove).on(EVENT_DRAG_END, defaults.dragend);
      this.$cropper.on(EVENT_MOUSE_DOWN, (this._dragstart = $.proxy(this.dragstart, this))).on(EVENT_DBLCLICK, (this._dblclick = $.proxy(this.dblclick, this)));
      defaults.zoomable && this.$cropper.on(EVENT_WHEEL, (this._wheel = $.proxy(this.wheel, this)));
      this.$scope.on(EVENT_MOUSE_MOVE, (this._dragmove = $.proxy(this.dragmove, this))).on(EVENT_MOUSE_UP, (this._dragend = $.proxy(this.dragend, this)));

      $window.on(EVENT_RESIZE, (this._resize = $.proxy(this.resize, this)));
    },

    removeListeners: function () {
      var defaults = this.defaults;

      this.$element.off(EVENT_DRAG_START, defaults.dragstart).off(EVENT_DRAG_MOVE, defaults.dragmove).off(EVENT_DRAG_END, defaults.dragend);
      this.$cropper.off(EVENT_MOUSE_DOWN, this._dragstart).off(EVENT_DBLCLICK, this._dblclick);
      defaults.zoomable && this.$cropper.off(EVENT_WHEEL, this._wheel);
      this.$scope.off(EVENT_MOUSE_MOVE, this._dragmove).off(EVENT_MOUSE_UP, this._dragend);

      $window.off(EVENT_RESIZE, this._resize);
    },

    initPreview: function () {
      var img = '<img src="' + this.url + '">';

      this.$preview = $(this.defaults.preview);
      this.$preview.html(img);
      this.$viewer.html(img);
    },

    initContainer: function () {
      var $container = this.$container;

      this.container = {
        width: max($container.width(), 300),
        height: max($container.height(), 150)
      };
    },

    initCropper: function () {
      var container = this.container,
          image = this.image,
          cropper;

      if (((image.naturalWidth * container.height / image.naturalHeight) - container.width) >= 0) {
        cropper = {
          width: container.width,
          height: container.width / image.aspectRatio,
          left: 0
        };

        cropper.top = (container.height - cropper.height) / 2;
      } else {
        cropper = {
          width: container.height * image.aspectRatio,
          height: container.height,
          top: 0
        };

        cropper.left = (container.width - cropper.width) / 2;
      }

      this.$cropper.css({
        width: round(cropper.width),
        height: round(cropper.height),
        left: round(cropper.left),
        top: round(cropper.top)
      });

      this.cropper = cropper;
    },

    initImage: function () {
      var image = this.image,
          cropper = this.cropper,
          defaultImage = {
            _width: cropper.width,
            _height: cropper.height,
            width: cropper.width,
            height: cropper.height,
            left: 0,
            top: 0,
            ratio: cropper.width / image.naturalWidth
          };

      this.defaultImage = $.extend({}, image, defaultImage);

      if (image._width !== cropper.width || image._height !== cropper.height) {
        $.extend(image, defaultImage);
      } else {
        image = $.extend(defaultImage, image);
      }

      this.image = image;
      this.renderImage();
    },

    renderImage: function (mode) {
      var image = this.image;

      if (mode === "zoom") {
        image.left -= (image.width - image.oldWidth) / 2;
        image.top -= (image.height - image.oldHeight) / 2;
      }

      image.left = min(max(image.left, image._width - image.width), 0);
      image.top = min(max(image.top, image._height - image.height), 0);

      this.$clone.css({
        width: round(image.width),
        height: round(image.height),
        marginLeft: round(image.left),
        marginTop: round(image.top)
      });

      if (mode) {
        this.defaults.done(this.getData());
        this.preview();
      }
    },

    initDragger: function () {
      var defaults = this.defaults,
          cropper = this.cropper,
          // If not set, use the original aspect ratio of the image.
          aspectRatio = defaults.aspectRatio || this.image.aspectRatio,
          ratio = this.image.ratio,
          dragger;

      if (((cropper.height * aspectRatio) - cropper.width) >= 0) {
        dragger = {
          height: cropper.width / aspectRatio,
          width: cropper.width,
          left: 0,
          top: (cropper.height - (cropper.width / aspectRatio)) / 2,
          maxWidth: cropper.width,
          maxHeight: cropper.width / aspectRatio
        };
      } else {
        dragger = {
          height: cropper.height,
          width: cropper.height * aspectRatio,
          left: (cropper.width - (cropper.height * aspectRatio)) / 2,
          top: 0,
          maxWidth: cropper.height * aspectRatio,
          maxHeight: cropper.height
        };
      }

      dragger.minWidth = 0;
      dragger.minHeight = 0;

      if (defaults.aspectRatio) {
        if (isFinite(defaults.maxWidth)) {
          dragger.maxWidth = min(dragger.maxWidth, defaults.maxWidth * ratio);
          dragger.maxHeight = dragger.maxWidth / aspectRatio;
        } else if (isFinite(defaults.maxHeight)) {
          dragger.maxHeight = min(dragger.maxHeight, defaults.maxHeight * ratio);
          dragger.maxWidth = dragger.maxHeight * aspectRatio;
        }

        if (defaults.minWidth > 0) {
          dragger.minWidth = max(0, defaults.minWidth * ratio);
          dragger.minHeight = dragger.minWidth / aspectRatio;
        } else if (defaults.minHeight > 0) {
          dragger.minHeight = max(0, defaults.minHeight * ratio);
          dragger.minWidth = dragger.minHeight * aspectRatio;
        }
      } else {
        dragger.maxWidth = min(dragger.maxWidth, defaults.maxWidth * ratio);
        dragger.maxHeight = min(dragger.maxHeight, defaults.maxHeight * ratio);
        dragger.minWidth = max(0, defaults.minWidth * ratio);
        dragger.minHeight = max(0, defaults.minHeight * ratio);
      }

      // minWidth can't be greater than maxWidth, and minHeight too.
      dragger.minWidth = min(dragger.maxWidth, dragger.minWidth);
      dragger.minHeight = min(dragger.maxHeight, dragger.minHeight);

      // Center the dragger by default
      dragger.height *= 0.8;
      dragger.width *= 0.8;
      dragger.left = (cropper.width - dragger.width) / 2;
      dragger.top = (cropper.height - dragger.height) / 2;
      dragger.oldLeft = dragger.left;
      dragger.oldTop = dragger.top;

      this.defaultDragger = dragger;
      this.dragger = $.extend({}, dragger);
    },

    renderDragger: function () {
      var dragger = this.dragger,
          cropper = this.cropper;

      if (dragger.width > dragger.maxWidth) {
        dragger.width = dragger.maxWidth;
        dragger.left = dragger.oldLeft;
      } else if (dragger.width < dragger.minWidth) {
        dragger.width = dragger.minWidth;
        dragger.left = dragger.oldLeft;
      }

      if (dragger.height > dragger.maxHeight) {
        dragger.height = dragger.maxHeight;
        dragger.top = dragger.oldTop;
      } else if (dragger.height < dragger.minHeight) {
        dragger.height = dragger.minHeight;
        dragger.top = dragger.oldTop;
      }

      dragger.left = min(max(dragger.left, 0), cropper.width - dragger.width);
      dragger.top = min(max(dragger.top, 0), cropper.height - dragger.height);
      dragger.oldLeft = dragger.left;
      dragger.oldTop = dragger.top;

      // Re-render the dragger
      this.dragger = dragger;
      this.defaults.done(this.getData());

      this.$dragger.css({
        width: round(dragger.width),
        height: round(dragger.height),
        left: round(dragger.left),
        top: round(dragger.top)
      });

      this.preview();
    },

    reset: function (deep) {
      if (!this.cropped) {
        return;
      }

      if (deep) {
        this.defaults.data = {};
      }

      this.image = $.extend({}, this.defaultImage);
      this.renderImage();
      this.dragger = $.extend({}, this.defaultDragger);
      this.setData(this.defaults.data);
    },

    clear: function () {
      if (!this.cropped) {
        return;
      }

      this.cropped = FALSE;

      this.setData({
        x: 0,
        y: 0,
        width: 0,
        height: 0
      });

      this.$canvas.removeClass(CLASS_MODAL);
      this.$dragger.addClass(CLASS_HIDDEN);
    },

    destroy: function () {
      var $this = this.$element;

      if (!this.ready) {
        return;
      }

      this.unbuild();
      $this.removeClass(CLASS_HIDDEN).removeData("cropper");

      if (this.rotated) {
        $this.replaceWith(this.$original);
      }
    },

    replace: function (url, /*INTERNAL*/ rotated) {
      var _this = this,
          $this = this.$element,
          element = this.element,
          context;

      if (url && url !== this.url) {
        if (!rotated) {
          this.rotated = FALSE;
          this.replaced = TRUE;
        }

        if ($this.is("img")) {
          $this.attr("src", url);
          this.load();
        } else if ($this.is("canvas") && this.support.canvas) {
          context = element.getContext("2d");

          $('<img src="' + url + '">').one("load", function () {
            element.width = this.width;
            element.height = this.height;
            context.clearRect(0, 0, element.width, element.height);
            context.drawImage(this, 0, 0);
            _this.load();
          });
        }
      }
    },

    setData: function (data, /*INTERNAL*/ once) {
      var cropper = this.cropper,
          dragger = this.dragger,
          image = this.image,
          aspectRatio = this.defaults.aspectRatio;

      if (!this.built || typeof data === STRING_UNDEFINED) {
        return;
      }

      if (data === NULL || $.isEmptyObject(data)) {
        dragger = $.extend({}, this.defaultDragger);
      }

      if ($.isPlainObject(data) && !$.isEmptyObject(data)) {

        if (!once) {
          this.defaults.data = data;
        }

        data = this.transformData(data);

        if (isNumber(data.x) && data.x <= cropper.width - image.left) {
          dragger.left = data.x + image.left;
        }

        if (isNumber(data.y) && data.y <= cropper.height - image.top) {
          dragger.top = data.y + image.top;
        }

        if (aspectRatio) {
          if (isNumber(data.width) && data.width <= dragger.maxWidth && data.width >= dragger.minWidth) {
            dragger.width = data.width;
            dragger.height = dragger.width / aspectRatio;
          } else if (isNumber(data.height) && data.height <= dragger.maxHeight && data.height >= dragger.minHeight) {
            dragger.height = data.height;
            dragger.width = dragger.height * aspectRatio;
          }
        } else {
          if (isNumber(data.width) && data.width <= dragger.maxWidth && data.width >= dragger.minWidth) {
            dragger.width = data.width;
          }

          if (isNumber(data.height) && data.height <= dragger.maxHeight && data.height >= dragger.minHeight) {
            dragger.height = data.height;
          }
        }
      }

      this.dragger = dragger;
      this.renderDragger();
    },

    getData: function () {
      var dragger = this.dragger,
          image = this.image,
          data = {};

      if (this.built) {
        data = {
          x: dragger.left - image.left,
          y: dragger.top - image.top,
          width: dragger.width,
          height: dragger.height
        };

        data = this.transformData(data, TRUE);
      }

      return data;
    },

    transformData: function (data, reverse) {
      var ratio = this.image.ratio,
          result = {};

      $.each(data, function (i, n) {
        n = num(n);

        if (REGEXP_OPTIONS.test(i) && !isNaN(n)) {
          // Not round when set data.
          result[i] = reverse ? round(n / ratio) : n * ratio;
        }
      });

      return result;
    },

    setAspectRatio: function (aspectRatio) {
      var freeRatio = aspectRatio === "auto";

      aspectRatio = num(aspectRatio);

      if (freeRatio || (!isNaN(aspectRatio) && aspectRatio > 0)) {
        this.defaults.aspectRatio = freeRatio ? NAN : aspectRatio;

        if (this.built) {
          this.initDragger();
          this.renderDragger();
        }
      }
    },

    getImageData: function () {
      var data = {};

      if (this.ready) {
        $.each(this.image, function (name, value) {
          if (REGEXP_PROPERTIES.test(name)) {
            data[name] = value;
          }
        });
      }

      return data;
    },

    getDataURL: function (type, option) {
      var canvas = $("<canvas>")[0],
          data = this.getData(),
          dataURL = "";

      if (this.cropped && this.support.canvas) {
        canvas.width = data.width;
        canvas.height = data.height;
        canvas.getContext("2d").drawImage(this.$clone[0], data.x, data.y, data.width, data.height, 0, 0, data.width, data.height);
        dataURL = canvas.toDataURL(type, option);
      }

      return dataURL;
    },

    setDragMode: function (mode) {
      var $canvas = this.$canvas,
          defaults = this.defaults,
          cropable = FALSE,
          movable = FALSE;

      if (!this.built || this.disabled) {
        return;
      }

      switch (mode) {
        case "crop":
          if (defaults.dragCrop) {
            cropable = TRUE;
            $canvas.data(STRING_DIRECTIVE, mode);
          }

          break;

        case "move":
          if (defaults.movable) {
            movable = TRUE;
            $canvas.data(STRING_DIRECTIVE, mode);
          }

          break;

        default:
          $canvas.removeData(STRING_DIRECTIVE);
      }

      $canvas.toggleClass(CLASS_CROP, cropable).toggleClass(CLASS_MOVE, movable);
    },

    enable: function () {
      if (this.built) {
        this.disabled = FALSE;
        this.$cropper.removeClass(CLASS_DISABLED);
      }
    },

    disable: function () {
      if (this.built) {
        this.disabled = TRUE;
        this.$cropper.addClass(CLASS_DISABLED);
      }
    },

    rotate: function (degree) {
      var image = this.image;

      degree = num(degree) || 0;

      if (!this.built || degree === 0 || this.disabled || !this.defaults.rotatable || !this.support.canvas) {
        return;
      }

      this.rotated = TRUE;
      degree = (image.rotate = (image.rotate + degree) % 360);

       // replace with "true" to prevent to override the original image
      this.replace(this.getRotatedDataURL(degree), true);
    },

    getRotatedDataURL: function (degree) {
      var $image = this.$original.clone(),
          canvas = $("<canvas>")[0],
          context = canvas.getContext("2d"),
          arc = degree * Math.PI / 180,
          deg = abs(degree) % 180,
          acuteAngle = deg > 90 ? (180 - deg) : deg,
          acuteAngleArc = acuteAngle * Math.PI / 180,
          originalImage = this.originalImage,
          naturalWidth = originalImage.naturalWidth,
          naturalHeight = originalImage.naturalHeight,
          width = abs(naturalWidth * cos(acuteAngleArc) + naturalHeight * sin(acuteAngleArc)),
          height = abs(naturalWidth * sin(acuteAngleArc) + naturalHeight * cos(acuteAngleArc));

      canvas.width = width;
      canvas.height = height;
      context.save();
      context.translate(width / 2, height / 2);
      context.rotate(arc);

      // Append the image to document to avoid "NS_ERROR_NOT_AVAILABLE" error on Firefox when call the "drawImage" method.
      $image.addClass(CLASS_INVISIBLE).prependTo(this.$cropper);

      context.drawImage(
        $image[0],
        -naturalWidth / 2,
        -naturalHeight / 2,
        naturalWidth,
        naturalHeight
      );

      context.restore();

      return canvas.toDataURL();
    },

    zoom: function (delta) {
      var image = this.image,
          width,
          height,
          range;

      delta = num(delta);

      if (!this.built || !delta || this.disabled || !this.defaults.zoomable) {
        return;
      }

      width = image.width * (1 + delta);
      height = image.height * (1 + delta);
      range = width / image._width;

      if (range > 10) {
        return;
      }

      if (range < 1) {
        width = image._width;
        height = image._height;
      }

      if (range <= 1) {
        this.setDragMode("crop");
      } else {
        this.setDragMode("move");
      }

      image.oldWidth = image.width;
      image.oldHeight = image.height;

      image.width = width;
      image.height = height;
      image.ratio = image.width / image.naturalWidth;

      this.renderImage("zoom");
    },

    dblclick: function () {
      if (this.disabled) {
        return;
      }

      if (this.$canvas.hasClass(CLASS_CROP)) {
        this.setDragMode("move");
      } else {
        this.setDragMode("crop");
      }
    },

    wheel: function (event) {
      var e = event.originalEvent,
          msDeltaY = 117.25, // IE
          mozDelatY = 5, // Firefox
          webkitDelatY = 166.66665649414062, // Chrome, Opera
          zoomDelta = 0.1, // 10%
          delta;

      if (this.disabled) {
        return;
      }

      event.preventDefault();

      if (e.deltaY) {
        delta = e.deltaY;
        delta = delta % mozDelatY === 0 ? delta / mozDelatY : delta % msDeltaY === 0 ? delta / msDeltaY : delta / webkitDelatY;
      } else {
        delta = e.wheelDelta ? -e.wheelDelta / 120 : (e.detail ? e.detail / 3 : 0);
      }

      this.zoom(delta * zoomDelta);
    },

    dragstart: function (event) {
      var touches = event.originalEvent.touches,
          e = event,
          directive,
          dragStartEvent,
          touchesLength;

      if (this.disabled) {
        return;
      }

      if (touches) {
        touchesLength = touches.length;

        if (touchesLength > 1) {
          if (this.defaults.zoomable && touchesLength === 2) {
            e = touches[1];
            this.startX2 = e.pageX;
            this.startY2 = e.pageY;
            directive = "zoom";
          } else {
            return;
          }
        }

        e = touches[0];
      }

      directive = directive || $(e.target).data(STRING_DIRECTIVE);

      if (REGEXP_DIRECTIVES.test(directive)) {
        event.preventDefault();

        dragStartEvent = $.Event(EVENT_DRAG_START);
        this.$element.trigger(dragStartEvent);

        if (dragStartEvent.isDefaultPrevented()) {
          return;
        }

        this.directive = directive;
        this.cropping = FALSE;
        this.startX = e.pageX;
        this.startY = e.pageY;

        if (directive === "crop") {
          this.cropping = TRUE;
          this.$canvas.addClass(CLASS_MODAL);
        }
      }
    },

    dragmove: function (event) {
      var touches = event.originalEvent.touches,
          e = event,
          dragMoveEvent,
          touchesLength;

      if (this.disabled) {
        return;
      }

      if (touches) {
        touchesLength = touches.length;

        if (touchesLength > 1) {
          if (this.defaults.zoomable && touchesLength === 2) {
            e = touches[1];
            this.endX2 = e.pageX;
            this.endY2 = e.pageY;
          } else {
            return;
          }
        }

        e = touches[0];
      }

      if (this.directive) {
        event.preventDefault();

        dragMoveEvent = $.Event(EVENT_DRAG_MOVE);
        this.$element.trigger(dragMoveEvent);

        if (dragMoveEvent.isDefaultPrevented()) {
          return;
        }

        this.endX = e.pageX;
        this.endY = e.pageY;

        this.dragging();
      }
    },

    dragend: function (event) {
      var dragEndEvent;

      if (this.disabled) {
        return;
      }

      if (this.directive) {
        event.preventDefault();

        dragEndEvent = $.Event(EVENT_DRAG_END);
        this.$element.trigger(dragEndEvent);

        if (dragEndEvent.isDefaultPrevented()) {
          return;
        }

        if (this.cropping) {
          this.cropping = FALSE;
          this.$canvas.toggleClass(CLASS_MODAL, this.cropped && this.defaults.modal);
        }

        this.directive = "";
      }
    },

    dragging: function () {
      var directive = this.directive,
          image = this.image,
          cropper = this.cropper,
          maxWidth = cropper.width,
          maxHeight = cropper.height,
          dragger = this.dragger,
          width = dragger.width,
          height = dragger.height,
          left = dragger.left,
          top = dragger.top,
          right = left + width,
          bottom = top + height,
          renderable = TRUE,
          defaults = this.defaults,
          aspectRatio = defaults.aspectRatio,
          range = {
            x: this.endX - this.startX,
            y: this.endY - this.startY
          },
          offset;

      if (aspectRatio) {
        range.X = range.y * aspectRatio;
        range.Y = range.x / aspectRatio;
      }

      switch (directive) {
        // Move dragger
        case "all":
          left += range.x;
          top += range.y;

          break;

        // Resize dragger
        case "e":
          if (range.x >= 0 && (right >= maxWidth || aspectRatio && (top <= 0 || bottom >= maxHeight))) {
            renderable = FALSE;
            break;
          }

          width += range.x;

          if (aspectRatio) {
            height = width / aspectRatio;
            top -= range.Y / 2;
          }

          if (width < 0) {
            directive = "w";
            width = 0;
          }

          break;

        case "n":
          if (range.y <= 0 && (top <= 0 || aspectRatio && (left <= 0 || right >= maxWidth))) {
            renderable = FALSE;
            break;
          }

          height -= range.y;
          top += range.y;

          if (aspectRatio) {
            width = height * aspectRatio;
            left += range.X / 2;
          }

          if (height < 0) {
            directive = "s";
            height = 0;
          }

          break;

        case "w":
          if (range.x <= 0 && (left <= 0 || aspectRatio && (top <= 0 || bottom >= maxHeight))) {
            renderable = FALSE;
            break;
          }

          width -= range.x;
          left += range.x;

          if (aspectRatio) {
            height = width / aspectRatio;
            top += range.Y / 2;
          }

          if (width < 0) {
            directive = "e";
            width = 0;
          }

          break;

        case "s":
          if (range.y >= 0 && (bottom >= maxHeight || aspectRatio && (left <= 0 || right >= maxWidth))) {
            renderable = FALSE;
            break;
          }

          height += range.y;

          if (aspectRatio) {
            width = height * aspectRatio;
            left -= range.X / 2;
          }

          if (height < 0) {
            directive = "n";
            height = 0;
          }

          break;

        case "ne":
          if (aspectRatio) {
            if (range.y <= 0 && (top <= 0 || right >= maxWidth)) {
              renderable = FALSE;
              break;
            }

            height -= range.y;
            top += range.y;
            width = height * aspectRatio;
          } else {
            if (range.x >= 0) {
              if (right < maxWidth) {
                width += range.x;
              } else if (range.y <= 0 && top <= 0) {
                renderable = FALSE;
              }
            } else {
              width += range.x;
            }

            if (range.y <= 0) {
              if (top > 0) {
                height -= range.y;
                top += range.y;
              }
            } else {
              height -= range.y;
              top += range.y;
            }
          }

          if (height < 0) {
            directive = "sw";
            height = 0;
            width = 0;
          }

          break;

        case "nw":
          if (aspectRatio) {
            if (range.y <= 0 && (top <= 0 || left <= 0)) {
              renderable = FALSE;
              break;
            }

            height -= range.y;
            top += range.y;
            width = height * aspectRatio;
            left += range.X;
          } else {
            if (range.x <= 0) {
              if (left > 0) {
                width -= range.x;
                left += range.x;
              } else if (range.y <= 0 && top <= 0) {
                renderable = FALSE;
              }
            } else {
              width -= range.x;
              left += range.x;
            }

            if (range.y <= 0) {
              if (top > 0) {
                height -= range.y;
                top += range.y;
              }
            } else {
              height -= range.y;
              top += range.y;
            }
          }

          if (height < 0) {
            directive = "se";
            height = 0;
            width = 0;
          }

          break;

        case "sw":
          if (aspectRatio) {
            if (range.x <= 0 && (left <= 0 || bottom >= maxHeight)) {
              renderable = FALSE;
              break;
            }

            width -= range.x;
            left += range.x;
            height = width / aspectRatio;
          } else {
            if (range.x <= 0) {
              if (left > 0) {
                width -= range.x;
                left += range.x;
              } else if (range.y >= 0 && bottom >= maxHeight) {
                renderable = FALSE;
              }
            } else {
              width -= range.x;
              left += range.x;
            }

            if (range.y >= 0) {
              if (bottom < maxHeight) {
                height += range.y;
              }
            } else {
              height += range.y;
            }
          }

          if (width < 0) {
            directive = "ne";
            height = 0;
            width = 0;
          }

          break;

        case "se":
          if (aspectRatio) {
            if (range.x >= 0 && (right >= maxWidth || bottom >= maxHeight)) {
              renderable = FALSE;
              break;
            }

            width += range.x;
            height = width / aspectRatio;
          } else {
            if (range.x >= 0) {
              if (right < maxWidth) {
                width += range.x;
              } else if (range.y >= 0 && bottom >= maxHeight) {
                renderable = FALSE;
              }
            } else {
              width += range.x;
            }

            if (range.y >= 0) {
              if (bottom < maxHeight) {
                height += range.y;
              }
            } else {
              height += range.y;
            }
          }

          if (width < 0) {
            directive = "nw";
            height = 0;
            width = 0;
          }

          break;

        // Move image
        case "move":
          image.left += range.x;
          image.top += range.y;
          this.renderImage("move");
          renderable = FALSE;

          break;

        // Scale image
        case "zoom":
          if (defaults.zoomable) {
            this.zoom(function (x, y, x1, y1, x2, y2) {
              return (sqrt(x2 * x2 + y2 * y2) - sqrt(x1 * x1 + y1 * y1)) / sqrt(x * x + y * y);
            }(
              image.width,
              image.height,
              abs(this.startX - this.startX2),
              abs(this.startY - this.startY2),
              abs(this.endX - this.endX2),
              abs(this.endY - this.endY2)
            ));

            this.endX2 = this.startX2;
            this.endY2 = this.startY2;
          }

          break;

        // Crop image
        case "crop":
          if (range.x && range.y) {
            offset = this.$cropper.offset();
            left = this.startX - offset.left;
            top = this.startY - offset.top;
            width = dragger.minWidth;
            height = dragger.minHeight;

            if (range.x > 0) {
              if (range.y > 0) {
                directive = "se";
              } else {
                directive = "ne";
                top -= height;
              }
            } else {
              if (range.y > 0) {
                directive = "sw";
                left -= width;
              } else {
                directive = "nw";
                left -= width;
                top -= height;
              }
            }

            // Show the dragger if is hidden
            if (!this.cropped) {
              this.cropped = TRUE;
              this.$dragger.removeClass(CLASS_HIDDEN);
            }
          }

          break;

        // No default
      }

      if (renderable) {
        dragger.width = width;
        dragger.height = height;
        dragger.left = left;
        dragger.top = top;
        this.directive = directive;

        this.renderDragger();
      }

      // Override
      this.startX = this.endX;
      this.startY = this.endY;
    }
  };

  // Use the string compressor: Strmin (https://github.com/fengyuanchen/strmin)
  Cropper.TEMPLATE = (function (source, words) {
    words = words.split(",");
    return source.replace(/\d+/g, function (i) {
      return words[i];
    });
  })('<0 6="5-container"><0 6="5-canvas"></0><0 6="5-dragger"><1 6="5-viewer"></1><1 6="5-8 8-h"></1><1 6="5-8 8-v"></1><1 6="5-face" 3-2="all"></1><1 6="5-7 7-e" 3-2="e"></1><1 6="5-7 7-n" 3-2="n"></1><1 6="5-7 7-w" 3-2="w"></1><1 6="5-7 7-s" 3-2="s"></1><1 6="5-4 4-e" 3-2="e"></1><1 6="5-4 4-n" 3-2="n"></1><1 6="5-4 4-w" 3-2="w"></1><1 6="5-4 4-s" 3-2="s"></1><1 6="5-4 4-ne" 3-2="ne"></1><1 6="5-4 4-nw" 3-2="nw"></1><1 6="5-4 4-sw" 3-2="sw"></1><1 6="5-4 4-se" 3-2="se"></1></0></0>', "div,span,directive,data,point,cropper,class,line,dashed");

  /* Template source:
  <div class="cropper-container">
    <div class="cropper-canvas"></div>
    <div class="cropper-dragger">
      <span class="cropper-viewer"></span>
      <span class="cropper-dashed dashed-h"></span>
      <span class="cropper-dashed dashed-v"></span>
      <span class="cropper-face" data-directive="all"></span>
      <span class="cropper-line line-e" data-directive="e"></span>
      <span class="cropper-line line-n" data-directive="n"></span>
      <span class="cropper-line line-w" data-directive="w"></span>
      <span class="cropper-line line-s" data-directive="s"></span>
      <span class="cropper-point point-e" data-directive="e"></span>
      <span class="cropper-point point-n" data-directive="n"></span>
      <span class="cropper-point point-w" data-directive="w"></span>
      <span class="cropper-point point-s" data-directive="s"></span>
      <span class="cropper-point point-ne" data-directive="ne"></span>
      <span class="cropper-point point-nw" data-directive="nw"></span>
      <span class="cropper-point point-sw" data-directive="sw"></span>
      <span class="cropper-point point-se" data-directive="se"></span>
    </div>
  </div>
  */

  Cropper.DEFAULTS = {
    // Basic
    aspectRatio: "auto",
    data: {
      // x: 0,
      // y: 0,
      // width: 300,
      // height: 150
    },
    done: $.noop,
    preview: "",

    // Toggles
    multiple: FALSE,
    autoCrop: TRUE,
    dragCrop: TRUE,
    dashed: TRUE,
    modal: TRUE,
    movable: TRUE,
    resizable: TRUE,
    zoomable: TRUE,
    rotatable: TRUE,

    // Dimensions
    minWidth: 0,
    minHeight: 0,
    maxWidth: INFINITY,
    maxHeight: INFINITY,

    // Events
    build: NULL,
    built: NULL,
    dragstart: NULL,
    dragmove: NULL,
    dragend: NULL
  };

  Cropper.setDefaults = function (options) {
    $.extend(Cropper.DEFAULTS, options);
  };

  // Save the other cropper
  Cropper.other = $.fn.cropper;

  // Register as jQuery plugin
  $.fn.cropper = function (options) {
    var args = [].slice.call(arguments, 1),
        result;

    this.each(function () {
      var $this = $(this),
          data = $this.data("cropper"),
          fn;

      if (!data) {
        $this.data("cropper", (data = new Cropper(this, options)));
      }

      if (typeof options === "string" && $.isFunction((fn = data[options]))) {
        result = fn.apply(data, args);
      }
    });

    return (typeof result !== STRING_UNDEFINED ? result : this);
  };

  $.fn.cropper.Constructor = Cropper;
  $.fn.cropper.setDefaults = Cropper.setDefaults;

  // No conflict
  $.fn.cropper.noConflict = function () {
    $.fn.cropper = Cropper.other;
    return this;
  };
});

/*!
 * Cropper v0.7.2
 * https://github.com/fengyuanchen/cropper
 *
 * Copyright 2014 Fengyuan Chen
 * Released under the MIT license
 */

!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a(jQuery)}(function(a){"use strict";var b=a(window),c=a(document),d=!0,e=!1,f=null,g=0/0,h=1/0,i="undefined",j="directive",k=".cropper",l=/^(e|n|w|s|ne|nw|sw|se|all|crop|move|zoom)$/,m=/^(x|y|width|height)$/,n=/^(naturalWidth|naturalHeight|width|height|aspectRatio|ratio)$/,o="cropper-modal",p="cropper-hidden",q="cropper-invisible",r="cropper-move",s="cropper-crop",t="cropper-disabled",u="mousedown touchstart",v="mousemove touchmove",w="mouseup mouseleave touchend touchleave touchcancel",x="wheel mousewheel DOMMouseScroll",y="resize"+k,z="dblclick",A="build"+k,B="built"+k,C="dragstart"+k,D="dragmove"+k,E="dragend"+k,F=function(a){return"number"==typeof a},G=function(b,c){this.element=b,this.$element=a(b),this.defaults=a.extend({},G.DEFAULTS,a.isPlainObject(c)?c:{}),this.$original=f,this.ready=e,this.built=e,this.cropped=e,this.rotated=e,this.disabled=e,this.replaced=e,this.init()},H=Math.round,I=Math.sqrt,J=Math.min,K=Math.max,L=Math.abs,M=Math.sin,N=Math.cos,O=parseFloat;G.prototype={constructor:G,support:{canvas:a.isFunction(a("<canvas>")[0].getContext)},init:function(){var b=this.defaults;a.each(b,function(a,c){switch(a){case"aspectRatio":b[a]=L(O(c))||g;break;case"minWidth":case"minHeight":b[a]=L(O(c))||0;break;case"maxWidth":case"maxHeight":b[a]=L(O(c))||h}}),this.image={rotate:0},this.load()},load:function(){var b,c,f=this,g=this.$element,h=this.element,i=this.image;g.is("img")?c=g.attr("src"):g.is("canvas")&&this.support.canvas&&(c=h.toDataURL()),c&&(this.$clone&&this.$clone.remove(),this.replaced&&(this.replaced=e,i.rotate=0),this.$clone=b=a('<img src="'+c+'">'),b.one("load",function(){i.naturalWidth=this.naturalWidth||b.width(),i.naturalHeight=this.naturalHeight||b.height(),i.aspectRatio=i.naturalWidth/i.naturalHeight,f.url=c,f.ready=d,f.build()}),b.addClass(q).prependTo("body"))},build:function(){var b,e,f=this.$element,g=this.defaults;this.ready&&(this.built&&this.unbuild(),f.one(A,g.build),b=a.Event(A),f.trigger(b),b.isDefaultPrevented()||(this.$cropper=e=a(G.TEMPLATE),f.addClass(p),this.$clone.removeClass(q).prependTo(e),this.rotated||(this.$original=this.$clone.clone(),this.originalImage=a.extend({},this.image)),this.$container=f.parent(),this.$container.append(e),this.$canvas=e.find(".cropper-canvas"),this.$dragger=e.find(".cropper-dragger"),this.$viewer=e.find(".cropper-viewer"),g.autoCrop?this.cropped=d:this.$dragger.addClass(p),g.dragCrop&&this.setDragMode("crop"),g.modal&&this.$canvas.addClass(o),!g.dashed&&this.$dragger.find(".cropper-dashed").addClass(p),!g.movable&&this.$dragger.find(".cropper-face").addClass(p),!g.resizable&&this.$dragger.find(".cropper-line, .cropper-point").addClass(p),this.$scope=g.multiple?this.$cropper:c,this.addListeners(),this.initPreview(),this.built=d,this.update(),f.one(B,g.built),f.trigger(B)))},unbuild:function(){this.built&&(this.built=e,this.removeListeners(),this.$preview.empty(),this.$preview=f,this.$dragger=f,this.$canvas=f,this.$container=f,this.$cropper.remove(),this.$cropper=f)},update:function(a){this.initContainer(),this.initCropper(),this.initImage(),this.initDragger(),a?(this.setData(a,d),this.setDragMode("crop")):this.setData(this.defaults.data)},resize:function(){clearTimeout(this.resizing),this.resizing=setTimeout(a.proxy(this.update,this,this.getData()),200)},preview:function(){var b=this.image,c=this.dragger,d=b.width,e=b.height,f=c.left-b.left,g=c.top-b.top;this.$viewer.find("img").css({width:H(d),height:H(e),marginLeft:-H(f),marginTop:-H(g)}),this.$preview.each(function(){var b=a(this),h=b.width()/c.width;b.find("img").css({width:H(d*h),height:H(e*h),marginLeft:-H(f*h),marginTop:-H(g*h)})})},addListeners:function(){var c=this.defaults;this.$element.on(C,c.dragstart).on(D,c.dragmove).on(E,c.dragend),this.$cropper.on(u,this._dragstart=a.proxy(this.dragstart,this)).on(z,this._dblclick=a.proxy(this.dblclick,this)),c.zoomable&&this.$cropper.on(x,this._wheel=a.proxy(this.wheel,this)),this.$scope.on(v,this._dragmove=a.proxy(this.dragmove,this)).on(w,this._dragend=a.proxy(this.dragend,this)),b.on(y,this._resize=a.proxy(this.resize,this))},removeListeners:function(){var a=this.defaults;this.$element.off(C,a.dragstart).off(D,a.dragmove).off(E,a.dragend),this.$cropper.off(u,this._dragstart).off(z,this._dblclick),a.zoomable&&this.$cropper.off(x,this._wheel),this.$scope.off(v,this._dragmove).off(w,this._dragend),b.off(y,this._resize)},initPreview:function(){var b='<img src="'+this.url+'">';this.$preview=a(this.defaults.preview),this.$preview.html(b),this.$viewer.html(b)},initContainer:function(){var a=this.$container;this.container={width:K(a.width(),300),height:K(a.height(),150)}},initCropper:function(){var a,b=this.container,c=this.image;c.naturalWidth*b.height/c.naturalHeight-b.width>=0?(a={width:b.width,height:b.width/c.aspectRatio,left:0},a.top=(b.height-a.height)/2):(a={width:b.height*c.aspectRatio,height:b.height,top:0},a.left=(b.width-a.width)/2),this.$cropper.css({width:H(a.width),height:H(a.height),left:H(a.left),top:H(a.top)}),this.cropper=a},initImage:function(){var b=this.image,c=this.cropper,d={_width:c.width,_height:c.height,width:c.width,height:c.height,left:0,top:0,ratio:c.width/b.naturalWidth};this.defaultImage=a.extend({},b,d),b._width!==c.width||b._height!==c.height?a.extend(b,d):b=a.extend(d,b),this.image=b,this.renderImage()},renderImage:function(a){var b=this.image;"zoom"===a&&(b.left-=(b.width-b.oldWidth)/2,b.top-=(b.height-b.oldHeight)/2),b.left=J(K(b.left,b._width-b.width),0),b.top=J(K(b.top,b._height-b.height),0),this.$clone.css({width:H(b.width),height:H(b.height),marginLeft:H(b.left),marginTop:H(b.top)}),a&&(this.defaults.done(this.getData()),this.preview())},initDragger:function(){var b,c=this.defaults,d=this.cropper,e=c.aspectRatio||this.image.aspectRatio,f=this.image.ratio;b=d.height*e-d.width>=0?{height:d.width/e,width:d.width,left:0,top:(d.height-d.width/e)/2,maxWidth:d.width,maxHeight:d.width/e}:{height:d.height,width:d.height*e,left:(d.width-d.height*e)/2,top:0,maxWidth:d.height*e,maxHeight:d.height},b.minWidth=0,b.minHeight=0,c.aspectRatio?(isFinite(c.maxWidth)?(b.maxWidth=J(b.maxWidth,c.maxWidth*f),b.maxHeight=b.maxWidth/e):isFinite(c.maxHeight)&&(b.maxHeight=J(b.maxHeight,c.maxHeight*f),b.maxWidth=b.maxHeight*e),c.minWidth>0?(b.minWidth=K(0,c.minWidth*f),b.minHeight=b.minWidth/e):c.minHeight>0&&(b.minHeight=K(0,c.minHeight*f),b.minWidth=b.minHeight*e)):(b.maxWidth=J(b.maxWidth,c.maxWidth*f),b.maxHeight=J(b.maxHeight,c.maxHeight*f),b.minWidth=K(0,c.minWidth*f),b.minHeight=K(0,c.minHeight*f)),b.minWidth=J(b.maxWidth,b.minWidth),b.minHeight=J(b.maxHeight,b.minHeight),b.height*=.8,b.width*=.8,b.left=(d.width-b.width)/2,b.top=(d.height-b.height)/2,b.oldLeft=b.left,b.oldTop=b.top,this.defaultDragger=b,this.dragger=a.extend({},b)},renderDragger:function(){var a=this.dragger,b=this.cropper;a.width>a.maxWidth?(a.width=a.maxWidth,a.left=a.oldLeft):a.width<a.minWidth&&(a.width=a.minWidth,a.left=a.oldLeft),a.height>a.maxHeight?(a.height=a.maxHeight,a.top=a.oldTop):a.height<a.minHeight&&(a.height=a.minHeight,a.top=a.oldTop),a.left=J(K(a.left,0),b.width-a.width),a.top=J(K(a.top,0),b.height-a.height),a.oldLeft=a.left,a.oldTop=a.top,this.dragger=a,this.defaults.done(this.getData()),this.$dragger.css({width:H(a.width),height:H(a.height),left:H(a.left),top:H(a.top)}),this.preview()},reset:function(b){this.cropped&&(b&&(this.defaults.data={}),this.image=a.extend({},this.defaultImage),this.renderImage(),this.dragger=a.extend({},this.defaultDragger),this.setData(this.defaults.data))},clear:function(){this.cropped&&(this.cropped=e,this.setData({x:0,y:0,width:0,height:0}),this.$canvas.removeClass(o),this.$dragger.addClass(p))},destroy:function(){var a=this.$element;this.ready&&(this.unbuild(),a.removeClass(p).removeData("cropper"),this.rotated&&a.replaceWith(this.$original))},replace:function(b,c){var f,g=this,h=this.$element,i=this.element;b&&b!==this.url&&(c||(this.rotated=e,this.replaced=d),h.is("img")?(h.attr("src",b),this.load()):h.is("canvas")&&this.support.canvas&&(f=i.getContext("2d"),a('<img src="'+b+'">').one("load",function(){i.width=this.width,i.height=this.height,f.clearRect(0,0,i.width,i.height),f.drawImage(this,0,0),g.load()})))},setData:function(b,c){var d=this.cropper,e=this.dragger,g=this.image,h=this.defaults.aspectRatio;this.built&&typeof b!==i&&((b===f||a.isEmptyObject(b))&&(e=a.extend({},this.defaultDragger)),a.isPlainObject(b)&&!a.isEmptyObject(b)&&(c||(this.defaults.data=b),b=this.transformData(b),F(b.x)&&b.x<=d.width-g.left&&(e.left=b.x+g.left),F(b.y)&&b.y<=d.height-g.top&&(e.top=b.y+g.top),h?F(b.width)&&b.width<=e.maxWidth&&b.width>=e.minWidth?(e.width=b.width,e.height=e.width/h):F(b.height)&&b.height<=e.maxHeight&&b.height>=e.minHeight&&(e.height=b.height,e.width=e.height*h):(F(b.width)&&b.width<=e.maxWidth&&b.width>=e.minWidth&&(e.width=b.width),F(b.height)&&b.height<=e.maxHeight&&b.height>=e.minHeight&&(e.height=b.height))),this.dragger=e,this.renderDragger())},getData:function(){var a=this.dragger,b=this.image,c={};return this.built&&(c={x:a.left-b.left,y:a.top-b.top,width:a.width,height:a.height},c=this.transformData(c,d)),c},transformData:function(b,c){var d=this.image.ratio,e={};return a.each(b,function(a,b){b=O(b),m.test(a)&&!isNaN(b)&&(e[a]=c?H(b/d):b*d)}),e},setAspectRatio:function(a){var b="auto"===a;a=O(a),(b||!isNaN(a)&&a>0)&&(this.defaults.aspectRatio=b?g:a,this.built&&(this.initDragger(),this.renderDragger()))},getImageData:function(){var b={};return this.ready&&a.each(this.image,function(a,c){n.test(a)&&(b[a]=c)}),b},getDataURL:function(b,c){var d=a("<canvas>")[0],e=this.getData(),f="";return this.cropped&&this.support.canvas&&(d.width=e.width,d.height=e.height,d.getContext("2d").drawImage(this.$clone[0],e.x,e.y,e.width,e.height,0,0,e.width,e.height),f=d.toDataURL(b,c)),f},setDragMode:function(a){var b=this.$canvas,c=this.defaults,f=e,g=e;if(this.built&&!this.disabled){switch(a){case"crop":c.dragCrop&&(f=d,b.data(j,a));break;case"move":c.movable&&(g=d,b.data(j,a));break;default:b.removeData(j)}b.toggleClass(s,f).toggleClass(r,g)}},enable:function(){this.built&&(this.disabled=e,this.$cropper.removeClass(t))},disable:function(){this.built&&(this.disabled=d,this.$cropper.addClass(t))},rotate:function(a){var b=this.image;a=O(a)||0,this.built&&0!==a&&!this.disabled&&this.defaults.rotatable&&this.support.canvas&&(this.rotated=d,a=b.rotate=(b.rotate+a)%360,this.replace(this.getRotatedDataURL(a),!0))},getRotatedDataURL:function(b){var c=this.$original.clone(),d=a("<canvas>")[0],e=d.getContext("2d"),f=b*Math.PI/180,g=L(b)%180,h=g>90?180-g:g,i=h*Math.PI/180,j=this.originalImage,k=j.naturalWidth,l=j.naturalHeight,m=L(k*N(i)+l*M(i)),n=L(k*M(i)+l*N(i));return d.width=m,d.height=n,e.save(),e.translate(m/2,n/2),e.rotate(f),c.addClass(q).prependTo(this.$cropper),e.drawImage(c[0],-k/2,-l/2,k,l),e.restore(),d.toDataURL()},zoom:function(a){var b,c,d,e=this.image;a=O(a),this.built&&a&&!this.disabled&&this.defaults.zoomable&&(b=e.width*(1+a),c=e.height*(1+a),d=b/e._width,d>10||(1>d&&(b=e._width,c=e._height),this.setDragMode(1>=d?"crop":"move"),e.oldWidth=e.width,e.oldHeight=e.height,e.width=b,e.height=c,e.ratio=e.width/e.naturalWidth,this.renderImage("zoom")))},dblclick:function(){this.disabled||this.setDragMode(this.$canvas.hasClass(s)?"move":"crop")},wheel:function(a){var b,c=a.originalEvent,d=117.25,e=5,f=166.66665649414062,g=.1;this.disabled||(a.preventDefault(),c.deltaY?(b=c.deltaY,b=b%e===0?b/e:b%d===0?b/d:b/f):b=c.wheelDelta?-c.wheelDelta/120:c.detail?c.detail/3:0,this.zoom(b*g))},dragstart:function(b){var c,f,g,h=b.originalEvent.touches,i=b;if(!this.disabled){if(h){if(g=h.length,g>1){if(!this.defaults.zoomable||2!==g)return;i=h[1],this.startX2=i.pageX,this.startY2=i.pageY,c="zoom"}i=h[0]}if(c=c||a(i.target).data(j),l.test(c)){if(b.preventDefault(),f=a.Event(C),this.$element.trigger(f),f.isDefaultPrevented())return;this.directive=c,this.cropping=e,this.startX=i.pageX,this.startY=i.pageY,"crop"===c&&(this.cropping=d,this.$canvas.addClass(o))}}},dragmove:function(b){var c,d,e=b.originalEvent.touches,f=b;if(!this.disabled){if(e){if(d=e.length,d>1){if(!this.defaults.zoomable||2!==d)return;f=e[1],this.endX2=f.pageX,this.endY2=f.pageY}f=e[0]}if(this.directive){if(b.preventDefault(),c=a.Event(D),this.$element.trigger(c),c.isDefaultPrevented())return;this.endX=f.pageX,this.endY=f.pageY,this.dragging()}}},dragend:function(b){var c;if(!this.disabled&&this.directive){if(b.preventDefault(),c=a.Event(E),this.$element.trigger(c),c.isDefaultPrevented())return;this.cropping&&(this.cropping=e,this.$canvas.toggleClass(o,this.cropped&&this.defaults.modal)),this.directive=""}},dragging:function(){var a,b=this.directive,c=this.image,f=this.cropper,g=f.width,h=f.height,i=this.dragger,j=i.width,k=i.height,l=i.left,m=i.top,n=l+j,o=m+k,q=d,r=this.defaults,s=r.aspectRatio,t={x:this.endX-this.startX,y:this.endY-this.startY};switch(s&&(t.X=t.y*s,t.Y=t.x/s),b){case"all":l+=t.x,m+=t.y;break;case"e":if(t.x>=0&&(n>=g||s&&(0>=m||o>=h))){q=e;break}j+=t.x,s&&(k=j/s,m-=t.Y/2),0>j&&(b="w",j=0);break;case"n":if(t.y<=0&&(0>=m||s&&(0>=l||n>=g))){q=e;break}k-=t.y,m+=t.y,s&&(j=k*s,l+=t.X/2),0>k&&(b="s",k=0);break;case"w":if(t.x<=0&&(0>=l||s&&(0>=m||o>=h))){q=e;break}j-=t.x,l+=t.x,s&&(k=j/s,m+=t.Y/2),0>j&&(b="e",j=0);break;case"s":if(t.y>=0&&(o>=h||s&&(0>=l||n>=g))){q=e;break}k+=t.y,s&&(j=k*s,l-=t.X/2),0>k&&(b="n",k=0);break;case"ne":if(s){if(t.y<=0&&(0>=m||n>=g)){q=e;break}k-=t.y,m+=t.y,j=k*s}else t.x>=0?g>n?j+=t.x:t.y<=0&&0>=m&&(q=e):j+=t.x,t.y<=0?m>0&&(k-=t.y,m+=t.y):(k-=t.y,m+=t.y);0>k&&(b="sw",k=0,j=0);break;case"nw":if(s){if(t.y<=0&&(0>=m||0>=l)){q=e;break}k-=t.y,m+=t.y,j=k*s,l+=t.X}else t.x<=0?l>0?(j-=t.x,l+=t.x):t.y<=0&&0>=m&&(q=e):(j-=t.x,l+=t.x),t.y<=0?m>0&&(k-=t.y,m+=t.y):(k-=t.y,m+=t.y);0>k&&(b="se",k=0,j=0);break;case"sw":if(s){if(t.x<=0&&(0>=l||o>=h)){q=e;break}j-=t.x,l+=t.x,k=j/s}else t.x<=0?l>0?(j-=t.x,l+=t.x):t.y>=0&&o>=h&&(q=e):(j-=t.x,l+=t.x),t.y>=0?h>o&&(k+=t.y):k+=t.y;0>j&&(b="ne",k=0,j=0);break;case"se":if(s){if(t.x>=0&&(n>=g||o>=h)){q=e;break}j+=t.x,k=j/s}else t.x>=0?g>n?j+=t.x:t.y>=0&&o>=h&&(q=e):j+=t.x,t.y>=0?h>o&&(k+=t.y):k+=t.y;0>j&&(b="nw",k=0,j=0);break;case"move":c.left+=t.x,c.top+=t.y,this.renderImage("move"),q=e;break;case"zoom":r.zoomable&&(this.zoom(function(a,b,c,d,e,f){return(I(e*e+f*f)-I(c*c+d*d))/I(a*a+b*b)}(c.width,c.height,L(this.startX-this.startX2),L(this.startY-this.startY2),L(this.endX-this.endX2),L(this.endY-this.endY2))),this.endX2=this.startX2,this.endY2=this.startY2);break;case"crop":t.x&&t.y&&(a=this.$cropper.offset(),l=this.startX-a.left,m=this.startY-a.top,j=i.minWidth,k=i.minHeight,t.x>0?t.y>0?b="se":(b="ne",m-=k):t.y>0?(b="sw",l-=j):(b="nw",l-=j,m-=k),this.cropped||(this.cropped=d,this.$dragger.removeClass(p)))}q&&(i.width=j,i.height=k,i.left=l,i.top=m,this.directive=b,this.renderDragger()),this.startX=this.endX,this.startY=this.endY}},G.TEMPLATE=function(a,b){return b=b.split(","),a.replace(/\d+/g,function(a){return b[a]})}('<0 6="5-container"><0 6="5-canvas"></0><0 6="5-dragger"><1 6="5-viewer"></1><1 6="5-8 8-h"></1><1 6="5-8 8-v"></1><1 6="5-face" 3-2="all"></1><1 6="5-7 7-e" 3-2="e"></1><1 6="5-7 7-n" 3-2="n"></1><1 6="5-7 7-w" 3-2="w"></1><1 6="5-7 7-s" 3-2="s"></1><1 6="5-4 4-e" 3-2="e"></1><1 6="5-4 4-n" 3-2="n"></1><1 6="5-4 4-w" 3-2="w"></1><1 6="5-4 4-s" 3-2="s"></1><1 6="5-4 4-ne" 3-2="ne"></1><1 6="5-4 4-nw" 3-2="nw"></1><1 6="5-4 4-sw" 3-2="sw"></1><1 6="5-4 4-se" 3-2="se"></1></0></0>',"div,span,directive,data,point,cropper,class,line,dashed"),G.DEFAULTS={aspectRatio:"auto",data:{},done:a.noop,preview:"",multiple:e,autoCrop:d,dragCrop:d,dashed:d,modal:d,movable:d,resizable:d,zoomable:d,rotatable:d,minWidth:0,minHeight:0,maxWidth:h,maxHeight:h,build:f,built:f,dragstart:f,dragmove:f,dragend:f},G.setDefaults=function(b){a.extend(G.DEFAULTS,b)},G.other=a.fn.cropper,a.fn.cropper=function(b){var c,d=[].slice.call(arguments,1);return this.each(function(){var e,f=a(this),g=f.data("cropper");g||f.data("cropper",g=new G(this,b)),"string"==typeof b&&a.isFunction(e=g[b])&&(c=e.apply(g,d))}),typeof c!==i?c:this},a.fn.cropper.Constructor=G,a.fn.cropper.setDefaults=G.setDefaults,a.fn.cropper.noConflict=function(){return a.fn.cropper=G.other,this}});
/**
 * Created by uv2sun on 15/4/10.
 * 将tpls/modal-cropper.html合并进来的uvCropper.js版本
 * 本指令基于ngCropper修改,但不需要依赖
 * 依赖jQuery，cropper.js，cropper.css, angular.js, bootstrap.css
 *
 * 直接使用指令uvCropperImg
 * 4个属性：
 *  imgUrl：最后生成的图片base64码
 *  imgRatio：图片横纵比, 不给则不限制横纵比
 *  imgMaxWidth：最后生成图片最大宽度
 *  imgCropper：最后生成截选图片后，调用的方法。
 *  initImgMaxWidth: 获取到图片后，直接缩放成这个宽度。
 */

angular.module('uvCropper', [])
    .directive('uvCropperImg', ['$timeout', '$q', 'uvCropperService', function ($timeout, $q, uvCropperService) {
        return {
            restrict: 'EA',
            scope: {
                imgUrl: '=',
                imgRatio: '@',
                imgMaxWidth: '@',
                imgCropper: '&',
                initImgMaxWidth: '@'
            },
            replace: true,
            transclude: true,
            template: '<div ng-click="show($event)" style="cursor:pointer;"><style>.cropper-preview {overflow: hidden;padding: 0;float: left;border-radius: 4px;margin: 0 4px 4px 0;border: 1px solid #eee;}</style><div ng-show="cropperShow" style="width: 980px;margin-left: -490px;margin-right: auto;position:fixed;top:1px;left:50%;z-index: 99999997;"><div class="panel panel-default" style="margin:10px auto;position: relative;z-index: 99999999;box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.4);border:none;"><div class="panel-body "><input type="file" class="btn btn-default" style="line-height: 14px;margin:0px 15px 10px;" onchange="angular.element(this).scope().selectFile(this)"><div ng-show="!!dataUrl" style="margin:14px;"><div class="well well-sm pull-left" style="width:600px;padding: 0;background-color: #000;"><div class="cropper-container" style="padding: 0;height:398px;" ng-show="dataUrl"><img id="_uv_cropper_img" ng-src="{{dataUrl}}"></div></div><div style="width: 300px;margin-left: 10px;" class="pull-left"><div ><div class="cropper-preview" style="width: 250px;height:250px;"></div></div><div ><div class="cropper-preview" style="width: 146px;height:146px;"></div><div class="pull-left"><div><div class="cropper-preview" style="width: 100px;height:100px;"></div></div><div class="cropper-preview" style="width: 41px;height:41px;"></div></div></div></div></div></div><div class="panel-footer text-right"><button class="btn btn-primary btn-sm" ng-click="ok($event)">确定</button><button class="btn btn-default btn-sm" ng-click="cancel($event)" style="margin-left: 10px;">取消</button></div></div><div style="position: fixed;top:0;left:0;width:100%;height:100%;background-color: rgba(2,2,2,0.5);z-index: 99999998;"></div></div><span ng-transclude style="cursor:pointer;margin-left: auto;margin-right: auto;position: relative;width:100%;height:100%;overflow: hidden;"></span></div>',
            link: function (scope, element, atts) {
                scope.cropperShow = false;
                var cropperImg = element.find('#_uv_cropper_img');
                scope.options = {
                    aspectRatio: 1,
                    preview: ".cropper-preview"
                };
                if (scope.imgRatio) scope.options.aspectRatio = scope.imgRatio;

                scope.selectFile = function (inputFileElement) {
                    scope.inputFileElement = inputFileElement;
                    scope.imgFile = inputFileElement.files[0];
                    uvCropperService.selectImgFile(scope.imgFile, cropperImg, scope.options, scope.initImgMaxWidth).then(function (du) {
                        scope.dataUrl = du;
                        console.log(du.substr(0, 200));
                    });
                    if (scope.initImgMaxWidth) {

                    }

                };
                scope.ok = function (e) {
                    if (scope.dataUrl) {
                        if (scope.imgMaxWidth) {
                            uvCropperService.getScaleCropperImgDataUrl(parseInt(scope.imgMaxWidth)).then(function (dataUrl) {
                                scope.imgUrl = dataUrl.split(',')[1];
                                $timeout(setScope);
                                return dataUrl;
                            })
                        } else {
                            //uvCropperService.getCropperImgDataUrl().then(function (dataUrl) {
                            //    scope.imgUrl = dataUrl.split(',')[1];
                            //    console.log(scope.imgUrl.length);
                            //});
                            uvCropperService.getScaleCropperImgDataUrl(400).then(function (dataUrl) {
                                scope.imgUrl = dataUrl.split(',')[1];
                                $timeout(setScope);
                                return dataUrl;
                            })
                        }
                    } else {
                        scope.cropperShow = false;
                        e.stopPropagation();
                    }
                };

                function setScope() {
                    scope.imgCropper && scope.imgCropper();
                    uvCropperService.hideCropperImg();
                    scope.cropperShow = false;
                    scope.dataUrl = "";
                    scope.inputFileElement.value = "";
                }

                scope.cancel = function (e) {
                    console.log(e);
                    e.stopPropagation();
                    console.log(scope.cropperShow);
                    scope.cropperShow = false;
                    console.log(scope.cropperShow);
                    uvCropperService.hideCropperImg();
                    scope.dataUrl = "";
                };

                scope.show = function (e) {
                    scope.cropperShow = true;
                };


            }
        }
    }])
    .service('uvCropperService', ['$timeout', '$q', '_Cropper', function ($timeout, $q, Cropper) {
        var shown = false;
        var _this = this;
        this.element = {rootElement: undefined, imgElement: undefined};
        var data, file, options;
        this.selectImgFile = function (imgFile, cropperImg, opts, initImgMaxWidth) {
            file = imgFile;
            _this.element.imgElement = cropperImg;
            options = opts;
            options.done = function (dataNew) {
                data = dataNew;
            };
            return (function(){

                if(!initImgMaxWidth){
                    var defer = $q.defer();
                    defer.resolve(file);
                    return defer.promise;
                }else{
                    return _this.scaleImg(imgFile, initImgMaxWidth);
                }

            })().then(Cropper.encode).then(function (dataUrl) {
                $timeout(_this.reCropperImg);  // wait for $digest to set image's src
                return dataUrl;
            });
        };

        this.scaleImg = function (imgFile, width) {
            return Cropper.scale(imgFile, {width:width}).then(function (blob) {
                file = blob;
                return blob;
            });
        };

        this.reCropperImg = function () {
            _this.hideCropperImg();
            _this.showCropperImg();
        };

        this.showCropperImg = function () {
            if (shown) return;
            shown = true;
            preprocess(options, _this.element.imgElement[0])
                .then(function (options) {
                    _this.element.imgElement.cropper(options);
                })
        };

        this.hideCropperImg = function () {
            if (!shown) return;
            shown = false;
            _this.element.imgElement.cropper('destroy');
        };

        this.disableCropper = function (disabled) {
            if (!shown) return;
            if (disabled) _this.element.imgElement.cropper('disable');
            if (!disabled) _this.element.imgElement.cropper('enable');
        };

        this.getCropperImgDataUrl = function () {
            return Cropper.crop(file, data).then(Cropper.encode).then(function (dataUrl) {
                return dataUrl;
            });
        };

        this.getScaleCropperImgDataUrl = function (maxWidth) {
            return Cropper.crop(file, data).then(function (blob) {
                return Cropper.scale(blob, {width: maxWidth});
            }).then(Cropper.encode).then(function (dataUrl) {
                return dataUrl;
            });
        };

        function preprocess(options, img) {
            console.log('preprocess begin');
            options = options || {};

            var defer = $q.defer();
            var toResolve = [passInitial(options)];

            if (options.maximize) toResolve.push(maximizeSelection(options, img));

            $q.all(toResolve).then(function (values) {
                var lastUpdatedOptions = values[values.length - 1];
                defer.resolve(lastUpdatedOptions);
            });
            console.log('preprocess end');
            return defer.promise;
        }

        /**
         * The only promise to resolve when no more processing promiseses passed.
         */
        function passInitial(options) {
            var defer = $q.defer();
            defer.resolve(options);
            return defer.promise;
        }

        /**
         * Change options to make selection maximum for the image.
         * fengyuanchen/cropper calculates valid selection's height & width
         * with respect to `aspectRatio`.
         */
        function maximizeSelection(options, img) {
            var defer = $q.defer();

            getRealSize(img).then(function (size) {
                options.data = size;
                defer.resolve(options);
            });

            return defer.promise;
        }

        /**
         * Returns real image size (without changes by css, attributes).
         */
        function getRealSize(img) {
            var defer = $q.defer();
            var size = {height: null, width: null};
            var image = new Image();

            image.onload = function () {
                defer.resolve({width: image.width, height: image.height});
            };

            image.src = img.src;
            return defer.promise;
        }
    }])
    .service('_Cropper', ['$q', function ($q) {

        this.encode = function (blob) {
            var defer = $q.defer();
            var reader = new FileReader();
            reader.onload = function (e) {
                defer.resolve(e.target.result);
            };
            reader.readAsDataURL(blob);
            return defer.promise;
        };

        this.decode = function (dataUrl) {
            var meta = dataUrl.split(';')[0];
            var type = meta.split(':')[1];
            var binary = atob(dataUrl.split(',')[1]);
            var array = new Uint8Array(binary.length);
            for (var i = 0; i < binary.length; i++) {
                array[i] = binary.charCodeAt(i);
            }
            return new Blob([array], {type: type});
        };

        this.crop = function (file, data) {
            var defer = $q.defer();
            var _decode = this.decode;

            this.encode(file).then(_createImage).then(function (image) {
                var canvas = createCanvas(data);
                var context = canvas.getContext('2d');

                context.drawImage(image, data.x, data.y, data.width, data.height, 0, 0, data.width, data.height);

                var encoded = canvas.toDataURL(file.type);
                var blob = _decode(encoded);

                defer.resolve(blob);
                removeElement(canvas);
            });

            return defer.promise;
        };

        this.scale = function (file, data) {
            var defer = $q.defer();
            var _decode = this.decode;

            this.encode(file).then(_createImage).then(function (image) {
                var heightOrig = image.height;
                var widthOrig = image.width;
                var ratio, height, width;

                if (angular.isNumber(data)) {
                    ratio = data;
                    height = heightOrig * ratio;
                    width = widthOrig * ratio;
                }

                if (angular.isObject(data)) {
                    ratio = widthOrig / heightOrig;
                    height = data.height;
                    width = data.width;

                    if (height && !width)
                        width = height * ratio;
                    else if (width && !height)
                        height = width / ratio;
                }

                var canvas = createCanvas(data);
                var context = canvas.getContext('2d');

                canvas.height = height;
                canvas.width = width;

                context.drawImage(image, 0, 0, widthOrig, heightOrig, 0, 0, width, height);

                var encoded = canvas.toDataURL(file.type);
                var blob = _decode(encoded);

                defer.resolve(blob);
                removeElement(canvas);
            });

            return defer.promise;
        };


        function _createImage(source) {
            var defer = $q.defer();
            var image = new Image();
            image.onload = function (e) {
                defer.resolve(e.target);
            };
            image.src = source;
            return defer.promise;
        }

        function createCanvas(data) {
            var canvas = document.createElement('canvas');
            canvas.width = data.width;
            canvas.height = data.height;
            canvas.style.display = 'none';
            document.body.appendChild(canvas);
            return canvas;
        }

        function removeElement(el) {
            el.parentElement.removeChild(el);
        }

    }]);
/**
 * Created by uv2sun on 15/12/15.
 * 基于ngDialog简化版本
 */
angular.module('uv.service.dialog', ['ngDialog'])
    .service('uvDialog', ['$rootScope', 'ngDialog', function ($rootScope, ngDialog) {
        this.show = function (msg) {
            return showDialog(msg);
        };
        this.confirm = function (msg) {
            return confirm(msg);
        };
        this.showTemplate = function (template, scope, data, controller, resolve) {
            return openTemplateDialog(template, scope, data, controller, resolve);
        };
        /**
         * 提示信息确认框
         * @param msg
         * @returns {*} promise
         */
        function showDialog(msg) {
            return ngDialog.open({
                template: '<div class="panel panel-primary" style="border:none;margin:-20px;">' +
                '<div class="panel-body" style="font-size: 13px;">' + msg + '</div>' +
                '<div class="panel-footer" style="overflow: auto;">' +
                '   <button class="btn btn-sm btn-primary pull-right" ng-click="closeThisDialog(1)">确定</button>' +
                '</div>' +
                '</div>',
                plain: true, showClose: false
            }).closePromise.then(function (data) {
                return data.value;
            });
        }

        /**
         * 确认信息提示框 promise dialog
         * @returns {*} promise 1:确定,其他取消
         */
        function confirm(msg) {
            return ngDialog.open({
                template: '<div class="panel panel-primary" style="border:none;margin:-20px;">' +
                '<div class="panel-body" style="font-size: 13px;">' + msg + '</div>' +
                '<div class="panel-footer" style="overflow: auto;">' +
                '   <button class="btn btn-sm btn-default pull-right" style="margin-left: 10px;" ng-click="closeThisDialog()">取消</button>' +
                '   <button class="btn btn-sm btn-primary pull-right" ng-click="closeThisDialog(1)">确定</button>' +
                '</div>' +
                '</div>',
                plain: true, showClose: false
            }).closePromise.then(function (data) {
                return data.value;
            });
        }

        /**
         * 自定义模版dialog
         * @param template 模版名称 <script type="text/ng-template" id="模版名称"></script>
         * @param scope 父级scope
         * @param data  jsonObject,key为模版scope[key]
         * @param controller 自定义controller名称
         * @param resolve resolve数组
         * @returns {*}
         */
        var openTemplateDialog = function (template, scope, data, controller, resolve) {
            if (!template) return;
            angular.forEach(data, function (v, k) {
                scope[k] = v;
            });
            var option = {scope: scope, closeByDocument: false, showClose: false, overlay: true, template: template};
            if (controller)option.controller = controller;
            if (resolve)option.resolve = resolve;
            return ngDialog.open(option).closePromise.then(function (data) {
                angular.forEach(data, function (v, k) {
                    delete scope[k];
                });
                return data.value;
            });
        };
    }]);
/**
 * Created by uv2sun on 15/7/13.
 */

angular.module('uv.fixed', [])
    /**
     * 需要滚动粘帖顶部的元素添加uv-sticky
     * 需要指定粘帖时距离顶部距离的给uv-sticky赋值，默认10个像素。注意赋值时不带单位px
     *
     * 注意：依赖jQuery
     *
     * 实现逻辑：
     *      1、将需要滚动时，粘帖顶部的元素前面插入一个占位元素，并设置样式。
     *      2、将粘帖元素加在body上，并设置为绝对定位
     *      3、给粘帖元素按占位元素的offset设置，并设置其max-height不可超出网页可是范围。
     *      4、重新粘帖元素的高度设置占位元素的高度
     *      5、增加滚动监听，当滚动高度大于粘帖元素在非fixed时可滚动的高度，改为fixed定位；否则absolute到body
     * */
    .directive('uvSticky', ['$document', '$timeout', function ($document, $timeout) {
        return {
            restrict: 'EA',
            replace: true,
            transclude: true,
            template: "<div ng-transclude></div>",
            scope: {},
            link: function (scope, elem, attr) {
                /***
                 * document.onready时，获取元素offset定位时，网页css渲染未必完成，所以获取的offset可能是错误的。
                 * window.load或者放在$timeout可解决。
                 */
                $timeout(function () {


                    /** 临时占位元素 */
                    var tElem = angular.element("<div></div>")
                        .attr('style', elem.attr('style'))
                        .attr('class', elem.attr('class'))
                        .css('width', elem.css('width'))
                        //                                    .css('height', elem.css('auto'))
                        .css('display', elem.css('display') || 'block')
                        .css('position', elem.css('position'))
                        .css('opacity', '0')
                        .insertBefore(elem);
                    var background = elem.css('background');
                    /** 粘帖顶部后，距离顶部高度位置 */
                    scope.uvStickyTop = parseInt(attr.uvSticky || 10);
                    //粘帖元素本身初始状态应该的高度，和替换它的占位元素一致。
                    var initTop = tElem.offset().top,
                    //左边距离
                        initLeft = tElem.offset().left,
                    //粘帖元素滚动时，不做fixed定位可滚动高度 ＝ 粘帖元素初始高度 - 元素本身margin-top - 粘帖时顶部高度
                        canScrollTop = initTop - parseInt(elem.css('margin-top')) - scope.uvStickyTop;

                    /** 粘帖顶部元素 */
                    elem.css('position', 'absolute')
                        .css('overflow', 'auto')
                        .css('max-height', angular.element(window).height() - initTop)
                        .css('width', tElem.css('width'))
                        .attr('class', tElem.attr('class'))
                        .css('background', tElem.css('background'))
                        .css('border', tElem.css('border'))
                        //.appendTo('body')
                        .offset(tElem.offset());

                    tElem.css('height', elem.css('height'))
                        .css('border', 'none')
                        .css('background', 'rgba(0,0,0,0)');

                    $document.scroll(function () {
                        /***
                         * 如果滚动高度大于可滚动高度，做fixed定位；否则按占位元素的offset绝对定位到body
                         */
                        if ($document.scrollTop() > canScrollTop) {
                            elem.css('position') != 'fixed' &&
                            elem.css('position', 'fixed')
                                .css({top: scope.uvStickyTop, left: initLeft})
                                .css('z-index', '9999');
                        } else {
                            elem.css('position') == 'fixed' && elem.css('position', 'absolute');
                            elem.offset().top != initTop && elem.offset(tElem.offset()).css('z-index', 1);
                        }
                    });

                });

            }

        }
    }])
    /***
     * 获取各种高、度宽度
     */
    .service('WHService', ['$window', '$document', function ($window, $document) {
        function GetInfo() {
            var s = "";
            s += "\r\ndocument.body.clientWidth :网页可见区域宽：" + document.body.clientWidth;
            s += "\r\ndocument.body.clientHeight:网页可见区域高：" + document.body.clientHeight;
            s += "\r\ndocument.body.offsetWidth :网页可见区域宽：" + document.body.offsetWidth + " (包括边线和滚动条的宽)";
            s += "\r\ndocument.body.offsetHeight:网页可见区域高：" + document.body.offsetHeight + " (包括边线的宽)";
            s += "\r\ndocument.body.scrollWidth :网页正文全文宽：" + document.body.scrollWidth;
            s += "\r\ndocument.body.scrollHeight:网页正文全文高：" + document.body.scrollHeight;
            s += "\r\ndocument.body.scrollTop   :网页被卷去的高(ff)：" + document.body.scrollTop;
            s += "\r\ndocument.documentElement.scrollTop:网页被卷去的高(ie)：" + document.documentElement.scrollTop;
            s += "\r\ndocument.body.scrollLeft  :网页被卷去的左：" + document.body.scrollLeft;
            s += "\r\nwindow.screenTop          :网页正文部分上：" + window.screenTop;
            s += "\r\nwindow.screenLeft         :网页正文部分左：" + window.screenLeft;
            s += "\r\nwindow.screen.height      :屏幕分辨率的高：" + window.screen.height;
            s += "\r\nwindow.screen.width       :屏幕分辨率的宽：" + window.screen.width;
            s += "\r\nwindow.screen.availHeight :屏幕可用工作区高度:" + window.screen.availHeight;
            s += "\r\nwindow.screen.availWidth  :屏幕可用工作区宽度：" + window.screen.availWidth;
            s += "\r\nwindow.screen.colorDepth  :你的屏幕设置是 " + window.screen.colorDepth + " 位彩色";
            s += "\r\nwindow.screen.colorDepth  :你的屏幕设置 " + window.screen.deviceXDPI + " 像素/英寸";
            console.log(s)
        }

        return {getWH: GetInfo}
    }]);


/**
 * Created by uv2sun on 15/2/15.
 * this depend jQuery
 *
 *
 *
 app.run(['$rootScope', 'uvLoading', function ($rootScope, ul) {
                $rootScope.$on('$stateChangeStart',
                        function (event, toState, toParams, fromState, fromParams) {
                            ul.loading();
                        });
                $rootScope.$on('$stateChangeSuccess',
                        function (event, toState, toParams, fromState, fromParams) {
                            ul.unloading();
                        })
            }]);
 */
angular.module('uv.service.loading', [])
    .run(['$templateCache', '$rootScope', 'uvLoading', function ($templateCache, $rootScope, uvLoading) {
        $rootScope._uv_loading = {show: false};
        $templateCache.put(
            'uv-loading.html',
            '<div ng-show="_uv_loading.show" style="z-index: 9999999998;">' +
            '<div' +
            '   style="z-index: 9999999999;' +
            '       position: fixed;' +
            '       top:50%;' +
            '       left:50%;' +
            '       height:110px;' +
            '       margin-top: -55px;' +
            '       width:114px;' +
            '       background-color:#000;' +
            '       color:#f2f2f2;' +
            '       margin-left: -57px;' +
            '       border-radius:6px;' +
            '       padding: 5px;' +
            '   ">' +
            '<img src="' + uvLoading._gif_path + '">' +
            '</div>' +
            '<div style="position: fixed;top:0;left:0;width: 100%;height:100%;background-color: rgba(0,0,0,0.3);z-index: 99999;"></div>' +
            '</div>'
        );
        angular.element($templateCache.get('uv-loading.html')).appendTo(angular.element('body'));

    }])
    .provider('uvLoading', [function () {
        var loading_icon = "";
        this.setLoadingGif = function (path) {
            loading_icon = path;
        };
        var timer;
        this.$get = ['$rootScope', '$timeout', function ($rootScope, $timeout) {
            return {
                loading: function (minisecond) {
                    this._loadCount++;
                    $rootScope._uv_loading.show = true;
                    if (minisecond) {
                        var _this = this;
                        timer = $timeout(function () {
                            _this.unloading();
                        }, minisecond);
                    }
                },
                unloading: function () {
                    if (--this._loadCount <= 0)
                        $rootScope._uv_loading.show = false;
                },
                _gif_path: loading_icon,
                _loadCount: 0
            };
        }];
    }])
    //.service('uvLoading', ['$rootScope', '$timeout', function ($rootScope, $timeout) {
    //    var timer;
    //    return {
    //        loading: function (minisecond) {
    //            $rootScope._uv_loading.show = true;
    //            if (minisecond) {
    //                var _this = this;
    //                timer = $timeout(function () {
    //                    _this.unloading();
    //                }, minisecond);
    //            }
    //        },
    //        unloading: function () {
    //            $rootScope._uv_loading.show = false;
    //        }
    //    }
    //}])
;
/**
 * Created by uv2sun on 15/3/16.
 * uvTip服务：
 *      showTip(content, minisecond)：
 *          @param content 现实内容，可以html代码
 *          @param minisecond 多少毫秒以后自动小时
 *
 *      hideTip：
 *          隐藏提示
 *
 * 20151223 update by uv2sun:
 *      增加showTip后,未指定延迟消失时,可以click触发hideTip.同时仍然支持promise用法then
 */
angular.module('uv.service.tip', [])
    .run(['$templateCache', '$rootScope', 'uvTip', function ($templateCache, $rootScope, uvTip) {
        $rootScope._uv_tip = {show: false};
        $templateCache.put(
            'uv-tip.html',
            '<div ng-show="_uv_tip.show" ng-click="_hideTip()" style="top:0;left:0;position: fixed;width:100%;height: 100%;background-color: rgba(0,0,0,0);z-index:99999;">' +
            '<div id="_uv_tip_father" style="top:70px;position: relative;">' +
            '<div id="_uv_tip" class="_uv_tip" style="margin:auto;color: #fff;background-color:rgba(0,0,0,0.7);position: relative;max-width: 80%;min-width: 10%;width:30%;-moz-border-radius: 6px;-webkit-border-radius: 6px;border-radius: 6px;padding:10px;text-align: center;">' +
            '</div>' +
            '</div>' +
            '</div>'
        );
        $rootScope._uv_tip.rootElement = angular.element($templateCache.get('uv-tip.html'));
        $rootScope._uv_tip.contentElement = $rootScope._uv_tip.rootElement.children("#_uv_tip_father").children("#_uv_tip");
        $rootScope._uv_tip.rootElement.appendTo(angular.element('body'));
        $rootScope._hideTip = function () {
            uvTip.hideTip();
        };
        console.log($rootScope._uv_tip.contentElement.html());
    }])
    .service('uvTip', ['$rootScope', '$timeout', '$q', function ($rootScope, $timeout, $q) {
        var timer, defer;
        return {
            /**
             *
             * @param content 现实内容，可以html代码
             * @param minisecond 多少毫秒以后自动小时
             */
            showTip: function (content, minisecond) {
                $rootScope._uv_tip.contentElement.html(content);
                $rootScope._uv_tip.show = true;
                defer = $q.defer();
                if (minisecond) {
                    var _this = this;
                    timer = $timeout(function () {
                        _this.hideTip();
                    }, minisecond);
                }
                return defer.promise;
            },
            /**
             * 隐藏提示
             */
            hideTip: function () {
                $rootScope._uv_tip.show = false;
                console.log('hidetip');
                console.log(defer);
                if (defer) {
                    defer.resolve(true);
                }
            }
        }
    }]);

/*--------------------------------------------------|
 | dTree 2.05 | www.destroydrop.com/javascript/tree/ |
 |---------------------------------------------------|
 | Copyright (c) 2002-2003 Geir Landr				|
 |                                                   |
 | This script can be used freely as long as all     |
 | copyright messages are intact.                    |
 |                                                   |
 | Updated: 17.04.2003                               |
 |--------------------------------------------------*/
/**
 songyw modify 2013/3/12 10:57:32
 for
 1、取消通过cookie作为中间存储，记录选中、打开状态，修改为 为dTree 增加存储区完成以上功能
 具体实现：通过selectedNode数组记录生成dTree时，存储所有node数组aNodes[]的数组下标,
 因为本树生成时，点击某节点时调用s()函数传入的就是这个数组下标
 2、增加单个结点单击 一次选中，再单击一次取消选中的功能。
 3、增加多选功能，将 selectedNode 修改为数组，用于存储选中节点。
 4、外部程序调用add节点时，增加节点是否选中功能.

 实现：
 1、增加add入参isSelected
 2、赋给Node._is
 3、调用addNode增加节点时，修改选中节点selectedNode数组。同时递归打开父节点
 5、增加用户树结构其他数据存放区域

 modify list:
 getSelected                function    modify      支持多选,并将返回修改为json对象或json对象数组，
 eg:[{'id':'idvalue1','name','nvalue1'},{'id':'idvalue2','name','nvalue2'}]
 s                          function    modify      增加单个结点单击 一次选中，再单击一次取消选中的功能，并操作选中数组
 dTree.config.multiSelect   var         add         用于多选标志位
 clearSelected              function    add         清除选中节点
 removeSeletedNode          function    add         从dTree的中间存储空间删除指定选中的node节点对应于aNodes[]的下标，并返回修改后的数组长度
 addSelectedNode            function    add         给dTree的中间存储空间增加选中的node节点对应于aNodes[]的下标
 dTree.selectedNode         var         modify      所有涉及使用此变量的地方都需要修改，所以增加function isSelectedNode()
 isSelectedNode             function    add         用于替换判断selectedNode值的地方
 addNode                    function    modify      外部程序调用add节点时，增加节点是否选中功能
 Node.userData              var         add         用于存放用户树结构复杂的数据。同时在getSelect中返回给用户。

 20160104:
 修改单选bug,再次支持单选
 20160615:
 修改bug,兼容多选单选
 */


var _TREE_DEBUG = false;


// Node object
/**
 默认值的书写规则（从左至右，依次省略）
 即 tree.add(id,pid,name,url);后面5个参数可以省略
 2：有间隔时的默认值（如存在第6个参数，但第5个参数想用默认值）
 即 tree.add(id,pid,name,url,"",target);必须这样写
 其他 tree.add(id,pid,name,url,"","","","",true);
 */
function Node(id, pid, name, url, title, target, icon, iconOpen, open, isSelected, tmpData) {

    this.id = id;					//node节点ID
    this.pid = pid;					//node节点父节点ID
    this.name = name;				//node节点显示名称
    this.url = url;					//node节点url，可以为javascript:function(){}
    this.title = title;				//node节点鼠标放上去时显示的提示内容
    this.target = target;			//节点链接所打开的目标frame（如框架目标mainFrame或是_blank,_self之类）
    this.icon = icon;				//节点关闭时的显示图片的路径
    this.iconOpen = iconOpen;		//节点打开时的显示图片的路径
    this._io = open || false; 		//是否展开标志
    this._is = !!isSelected;	    //是否选中
    this._ls = false;				//if a node has any children and if it is the last sibling
    this._hc = false;				//is or not father node
    this._ai = 0;					//节点顺序，在aNodes[]数组中的位置
    this._p;						//父节点node对象
    this.userData = tmpData || null;//用户树节点的复杂数据信息
}

//
/**
 * Tree object, songyw add multiSelect flag 2013/3/12 11:15:56
 * 20160615 songyw add clickNodeCallBackFn,单击节点事件。clickNodeCallBackFn(node.userData, node._is)
 * @param objName
 * @param iconPrefix
 */
function dTree(objName, iconPrefix) {
    this.config = {
        target: null,
        folderLinks: true,
        useSelection: true,
        useLines: true,
        useIcons: true,
        useStatusText: false,
        closeSameLevel: false,
        inOrder: false,
        multiSelect: false,
        checkbox: false    // 检查是否有复选框
    };
    this.icon = {
        root: iconPrefix + '/folderopen.gif',
        folder: iconPrefix + '/folder.gif',
        folderOpen: iconPrefix + '/folderopen.gif',
        node: iconPrefix + '/page.gif',
        empty: iconPrefix + '/empty.gif',
        line: iconPrefix + '/line.gif',
        join: iconPrefix + '/join.gif',
        joinBottom: iconPrefix + '/joinbottom.gif',
        plus: iconPrefix + '/plus.gif',
        plusBottom: iconPrefix + '/plusbottom.gif',
        minus: iconPrefix + '/minus.gif',
        minusBottom: iconPrefix + '/minusbottom.gif',
        nlPlus: iconPrefix + '/nolines_plus.gif',
        nlMinus: iconPrefix + '/nolines_minus.gif'
    };
    this.obj = objName;
    this.aNodes = [];
    this.aIndent = [];
    this.root = new Node(-1);
    this.selectedNode = []; //songyw modify 原始为对象或null，修改为[]数组，支持多选用的中间存储区
    this.selectedFound = false;
    this.completed = false;
}


// Adds a new node to the node array songyw modify for 使用方便
dTree.prototype.addDetail = function (id, pid, name, url, title, isSelected, userData, open, target, icon, iconOpen) {
    this.aNodes[this.aNodes.length] = new Node(id, pid, name, url, title, target, icon, iconOpen, open, isSelected, userData);
};
// Adds a new node to the node array songyw add for 简化使用
dTree.prototype.add = function (id, pid, name, url, title, isSelected, userData, open) {
    this.aNodes[this.aNodes.length] = new Node(id, pid, name, url, title, "", "", "", open, isSelected, userData);
};

//songyw add for  初始化树，主要是先对默认选中节点的父节点执行打开操作。通过遍历 selectedNode 数组 2013/3/12 15:17:39
dTree.prototype.init = function () {
    //alert('init');
    for (var i = 0; i < this.selectedNode.length; i++) {
        this.openTo(this.aNodes[this.selectedNode[i]].pid == -1 ? this.aNodes[this.selectedNode[i]].id : this.aNodes[this.selectedNode[i]].pid);
    }
};

// Open/close all nodes
dTree.prototype.openAll = function () {
    this.oAll(true);
};
dTree.prototype.closeAll = function () {
    this.oAll(false);
};

// Outputs the tree to the page
dTree.prototype.toString = function () {
    var str = '<div class="dtree">';
    if (document.getElementById) {
        str += this.addNode(this.root);//是个递归操作
    } else str += 'Browser not supported.';
    str += '</div>';
    //if (!this.selectedFound) this.selectedNode = []; // songyw modify 无逻辑意义，注视掉。
    this.completed = true;
    return str;
};

// Creates the tree structure songyw modify for 外部程序调用add节点时，增加节点是否选中功能 2013/3/12 13:51:21
dTree.prototype.addNode = function (pNode) {
    var str = '';
    var n = 0;
    if (this.config.inOrder) n = pNode._ai;
    for (n; n < this.aNodes.length; n++) {
        if (this.aNodes[n].pid == pNode.id) {
            var cn = this.aNodes[n];
            cn._p = pNode;
            cn._ai = n;
            this.setCS(cn);
            if (!cn.target && this.config.target) cn.target = this.config.target;
            if (!this.config.folderLinks && cn._hc) cn.url = null;
            //songyw modify for selectedNode 支持多选问题
            //if (this.config.useSelection && cn.id == this.selectedNode && !this.selectedFound) {
            //
            //	cn._is = true;
            //	this.selectedNode = n;
            //	this.selectedFound = true;
            //}
            //
            if (cn._is) {
                this.addSelectedNode(n);
            }

            str += this.node(cn, n);
            if (cn._ls) break;
        }
    }
    return str;
};

// Creates the node icon, url and text
dTree.prototype.node = function (node, nodeId) {
    var str = '<div class="dTreeNode">' + this.indent(node, nodeId);
    if (this.config.useIcons) {
        if (!node.icon) node.icon = (this.root.id == node.pid) ? this.icon.root : ((node._hc) ? this.icon.folder : this.icon.node);
        if (!node.iconOpen) node.iconOpen = (node._hc) ? this.icon.folderOpen : this.icon.node;
        if (this.root.id == node.pid) {
            node.icon = this.icon.root;
            node.iconOpen = this.icon.root;
        }
        str += '<img id="i' + this.obj + nodeId + '" src="' + ((node._io) ? node.iconOpen : node.icon) + '" alt="" />';
    }
    //添加上复选框
    if (this.config.checkbox == true) {
        //	alert(nodeId+","+json2string(node._p));
        //	alert(node._p._ai);
        str += '<input type="checkbox" name="checkboxValues"  style="cursor:pointer;" value="' + node.id + '" id="c' + this.obj + node.id
            + '" onClick="javascript:' + this.obj + '.cc(&quot;' + node._ai
            + '&quot;,&quot;' + node._p._ai + '&quot;);" ' + (node._is ? "checked" : '') + '/>';
    }
    if (!this.config.multiSelect || node.url) {
        str += '<a id="s' + this.obj + nodeId + '" class="' + ((this.config.useSelection) ? ((node._is ? 'nodeSel' : 'node')) : 'node') + '" href="' + (node.url || 'javascript:;') + '"';
        if (node.title) str += ' title="' + node.title + '"';
        // if (node.target) str += ' target="' + node.target + '"';
        // if (this.config.useStatusText) str += ' onmouseover="window.status=\'' + node.name + '\';return true;" onmouseout="window.status=\'\';return true;" ';
        if (!this.config.multiSelect && this.config.useSelection && ((node._hc && this.config.folderLinks) || !node._hc))
            str += ' onclick="javascript: ' + this.obj + '.s(' + nodeId + ');"';
        str += '>';
    }
    else if ((!this.config.folderLinks || !node.url) && node._hc && node.pid != this.root.id)
        str += '<a href="javascript: ' + this.obj + '.o(' + nodeId + ');" class="node">';
    str += node.name;
    if (!this.config.multiSelect || node.url || ((!this.config.folderLinks || !node.url) && node._hc)) str += '</a>';
    str += '</div>';
    if (node._hc) {
        str += '<div id="d' + this.obj + nodeId + '" class="clip" style="display:' + ((this.root.id == node.pid || node._io) ? 'block' : 'none') + ';">';
        str += this.addNode(node);
        str += '</div>';
    }
    this.aIndent.pop();
    return str;
};

// Adds the empty and line icons
dTree.prototype.indent = function (node, nodeId) {
    var str = '';
    if (this.root.id != node.pid) {
        for (var n = 0; n < this.aIndent.length; n++)
            str += '<img src="' + ( (this.aIndent[n] == 1 && this.config.useLines) ? this.icon.line : this.icon.empty ) + '" alt="" />';
        (node._ls) ? this.aIndent.push(0) : this.aIndent.push(1);
        if (node._hc) {
            str += '<a href="javascript: ' + this.obj + '.o(' + nodeId + ');"><img id="j' + this.obj + nodeId + '" src="';
            if (!this.config.useLines) str += (node._io) ? this.icon.nlMinus : this.icon.nlPlus;
            else str += ( (node._io) ? ((node._ls && this.config.useLines) ? this.icon.minusBottom : this.icon.minus) : ((node._ls && this.config.useLines) ? this.icon.plusBottom : this.icon.plus ) );
            str += '" alt="" /></a>';
        } else str += '<img src="' + ( (this.config.useLines) ? ((node._ls) ? this.icon.joinBottom : this.icon.join ) : this.icon.empty) + '" alt="" />';
    }
    return str;
};

// Checks if a node has any children and if it is the last sibling
dTree.prototype.setCS = function (node) {
    var lastId;
    for (var n = 0; n < this.aNodes.length; n++) {
        if (this.aNodes[n].pid == node.id) node._hc = true;
        if (this.aNodes[n].pid == node.pid) lastId = this.aNodes[n].id;
    }
    if (lastId == node.id) node._ls = true;
};

// Returns the selected node
//songyw modify 2013/3/12 12:20:54 for 支持多选,并将返回修改为json对象或json对象数组
dTree.prototype.getSelected = function () {
    //return (sn) ? sn : null;
    if (!this.selectedFound) return null;
    if (this.config.multiSelect) {
        var retJson = [];
        for (var i = 0; i < this.selectedNode.length; i++) {
            var tmpNode = this.aNodes[this.selectedNode[i]];
            if (tmpNode.userData) {
                retJson[i] = tmpNode.userData;
            } else {
                retJson[i] = {'id': tmpNode.id, 'name': tmpNode.name, 'userData': tmpNode.userData};
            }
        }
        return retJson;
    } else {
        var tmpNode = this.aNodes[this.selectedNode[0]];
        if (tmpNode.userData) {
            return tmpNode.userData;
        } else {
            return {'id': tmpNode.id, 'name': tmpNode.name};
        }
    }

};
//获取选中节点的路径
dTree.prototype.getSelectedNodePath = function () {
    var path;
    if (!this.selectedFound) return null;
    if (this.config.multiSelect) {

    } else {
        var tmpNode = this.aNodes[this.selectedNode[0]];
        //path="["+tmpNode.id+"]["+tmpNode.pid+"]"+tmpNode.name;
        path = tmpNode.name;
        while (tmpNode.pid != -1) {
            var parentNode = tmpNode._p;
            //path="["+parentNode.id+"]["+parentNode.pid+"]"+parentNode.name+" > "+path;
            path = parentNode.name + path;
            tmpNode = parentNode;
        }
    }
    return path;
};

//songyw add for 从dTree的中间存储空间删除指定选中的node节点对应于aNodes[]的下标，并返回修改后的数组长度 2013/3/12 11:53:09,
dTree.prototype.removeSeletedNode = function (value) {
    this.aNodes[value]._is = false;
    for (var i = 0; i < this.selectedNode.length; i++) {
        if (this.selectedNode[i] == value) {
            this.selectedNode.splice(i, 1);
            break;
        }
    }
    if (this.selectedNode.length == 0) this.selectedFound = false;
    return this.selectedNode.length;
};

//songyw add for 给dTree的中间存储空间增加选中的node节点对应于aNodes[]的下标 2013/3/12 12:06:26
dTree.prototype.addSelectedNode = function (value) {
    //先判断是否已经存在于selectedNode数组
    for (var i = 0; i < this.selectedNode.length; i++) {
        if (this.selectedNode[i] == value) return this.selectedNode.length;
    }
    this.aNodes[value]._is = true;
    this.selectedNode[this.selectedNode.length] = value;
    this.selectedFound = true;
    return this.selectedNode.length;
};

dTree.prototype.isSelectedNode = function (id) {
    for (var i = 0; i < this.selectedNode.length; i++) {
        if (this.selectedNode[i] == id) return true;
    }
    return false;
}

// Highlights the selected node songyw modify for 支持多选，和反复取消、选中一个节点
dTree.prototype.s = function (id) {
    if (!this.config.useSelection) return;
    var cn = this.aNodes[id];
    if (cn._hc && !this.config.folderLinks) return;

    //songyw modify to support multi select 2013/3/12 11:48:47
    //if (this.selectedNode != id) {
    //    if (this.selectedNode || this.selectedNode == 0) {
    //        var eOld = document.getElementById("s" + this.obj + this.selectedNode);
    //        eOld.className = "node";
    //    }
    //    var eNew = document.getElementById("s" + this.obj + id);
    //    eNew.className = "nodeSel";
    //    this.selectedNode = id;
    //
    //}


    if (cn._is) {

        var eOld = document.getElementById("s" + this.obj + id);
        eOld.className = "node";
        this.removeSeletedNode(id);
        cn._is = false;

    }
    //songyw add for 单击节点高亮显示，表示选中，再次单击表示取消高亮选中 2013/3/12 10:56:46 begin
    else {
        //是否多选判断
        if (!this.config.multiSelect && this.selectedFound) {
            for (var i = 0; i < this.selectedNode.length;) {//因为removeSeletedNode会改变数组长度，所以不用i++，其实是一直从左边删除i=0的记录
                var eOld = document.getElementById("s" + this.obj + this.selectedNode[i]);

                eOld.className = "node";
                this.aNodes[this.selectedNode[i]]._is = false;
                this.removeSeletedNode(this.selectedNode[i]);
            }

        }
        var eNew = document.getElementById("s" + this.obj + id);
        eNew.className = "nodeSel";
        cn._is = true;
        this.addSelectedNode(id);
    }
    //songyw add for 单击节点高亮显示，表示选中，再次单击表示取消高亮选中 2013/3/12 10:56:46 end

};

//songyw add for 清除选中节点
dTree.prototype.clearSelected = function () {
    for (var i = 0; i < this.selectedNode.length;) {
        //获得页面节点对象
        var eOld = document.getElementById("s" + this.obj + this.selectedNode[i]);
        //清除高亮显示 高亮显示className='nodeSel'
        eOld.className = "node";
        //选中节点中间数组删除当前循环到的数组元素。其实永远是第一个即下标为0的数组元素。从左边0开始一直删除。
        this.selectedNode.splice(i, 1);
    }
}

// Toggle Open or close
dTree.prototype.o = function (id) {
    var cn = this.aNodes[id];
    this.nodeStatus(!cn._io, id, cn._ls);
    cn._io = !cn._io;
    if (this.config.closeSameLevel) this.closeLevel(cn);

};

// Open or close all nodes
dTree.prototype.oAll = function (status) {
    for (var n = 0; n < this.aNodes.length; n++) {
        if (this.aNodes[n]._hc && this.aNodes[n].pid != this.root.id) {
            this.nodeStatus(status, n, this.aNodes[n]._ls)
            this.aNodes[n]._io = status;
        }
    }
};

// Opens the tree to a specific node
dTree.prototype.openTo = function (nId, bSelect, bFirst) {
    if (_TREE_DEBUG)alert(nId);
    if (!bFirst) {
        for (var n = 0; n < this.aNodes.length; n++) {
            if (this.aNodes[n].id == nId) {
                nId = n;
                break;
            }
        }
    }

    var cn = this.aNodes[nId];
    if (cn.pid == this.root.id || !cn._p) return;
    cn._io = true;
    cn._is = bSelect;
    if (this.completed && cn._hc) this.nodeStatus(true, cn._ai, cn._ls);
    if (this.completed && bSelect) this.s(cn._ai);
    else if (bSelect) this._sn = cn._ai;
    this.openTo(cn._p._ai, false, true);
};

// Closes all nodes on the same level as certain node
dTree.prototype.closeLevel = function (node) {
    for (var n = 0; n < this.aNodes.length; n++) {
        if (this.aNodes[n].pid == node.pid && this.aNodes[n].id != node.id && this.aNodes[n]._hc) {
            this.nodeStatus(false, n, this.aNodes[n]._ls);
            this.aNodes[n]._io = false;
            this.closeAllChildren(this.aNodes[n]);
        }
    }
}

// Closes all children of a node
dTree.prototype.closeAllChildren = function (node) {
    for (var n = 0; n < this.aNodes.length; n++) {
        if (this.aNodes[n].pid == node.id && this.aNodes[n]._hc) {
            if (this.aNodes[n]._io) this.nodeStatus(false, n, this.aNodes[n]._ls);
            this.aNodes[n]._io = false;
            this.closeAllChildren(this.aNodes[n]);
        }
    }
}

// Change the status of a node(open or closed)
dTree.prototype.nodeStatus = function (status, id, bottom) {
    var eDiv = document.getElementById('d' + this.obj + id);
    var eJoin = document.getElementById('j' + this.obj + id);
    if (this.config.useIcons) {
        var eIcon = document.getElementById('i' + this.obj + id);
        eIcon.src = (status) ? this.aNodes[id].iconOpen : this.aNodes[id].icon;
    }
    eJoin.src = (this.config.useLines) ?
        ((status) ? ((bottom) ? this.icon.minusBottom : this.icon.minus) : ((bottom) ? this.icon.plusBottom : this.icon.plus)) :
        ((status) ? this.icon.nlMinus : this.icon.nlPlus);
    eDiv.style.display = (status) ? 'block' : 'none';
};
//checkbox 多选   modify 5.14 wangwei
dTree.prototype.cc_parent = function (parent_node_ai, select_flag) {
    var node = this.aNodes[parent_node_ai];
    if (!select_flag) {
        var hasOtherChildrenSelected = false;
        for (var i = 0; i < this.selectedNode.length; i++) {
            if (this.aNodes[this.selectedNode[i]].pid == node.id) {
                hasOtherChildrenSelected = true;
                break;
            }
        }
        if (!hasOtherChildrenSelected) {
            this.removeSeletedNode(parent_node_ai);
            document.getElementById("c" + this.obj + node.id).checked = select_flag;
            if (node.pid != -1) this.cc_parent(node._p._ai, select_flag);
        }
    } else {
        this.addSelectedNode(parent_node_ai);
        document.getElementById("c" + this.obj + node.id).checked = select_flag;
        if (node.pid != -1) this.cc_parent(node._p._ai, select_flag);
    }
};

dTree.prototype.cc_children = function (node_ai, select_flag) {
    var node = this.aNodes[node_ai];
    document.getElementById("c" + this.obj + node.id).checked = select_flag;
    if (!select_flag) {
        this.removeSeletedNode(node_ai);
    } else {
        this.addSelectedNode(node_ai);
    }
    if (node._hc) {
        for (var i = parseInt(node_ai) + 1; i < this.aNodes.length; i++) {
            if (this.aNodes[i].pid == node.id) {
                this.cc_children(i, select_flag);
            }
        }
    }

};

dTree.prototype.cc = function (node_ai, parent_node_ai) {
    //首先获取这个多选框的id
    var node = this.aNodes[node_ai];
    var cs = document.getElementById("c" + this.obj + node.id).checked;
    this.cc_children(node_ai, cs);
    // this.cc_parent(parent_node_ai, cs); //根据实际需求决定,当前项目不需要同时选中父级节点

//    var n;
//    var len = this.aNodes.length;
//
//    for (n = 0; n < len; n++) { //如果循环每一个节点
//        if (this.aNodes[n].pid == nodeId) { //如果选中的是非叶子节点,则要将所有的子节点选择和父节点一样
//            document.getElementById("c" + this.obj + this.aNodes[n].id).checked = cs;
//            this.cc(this.aNodes[n].id, nodeId);
//        }
//    }
//
//    if (cs == true) {  //当前是选中状态
//        var pid = nodePid;
//        var bSearch;
////        node._is=true;//设置选中
//        //    this.addSelectedNode(node._ai);
//        //    alert("!!!!!!!!!!!"+this.aNodes[nodeId]);
//
//        //   this.addSelectedNode(id);
//        do {
//            bSearch = false;
//            for (n = 0; n < len; n++) {  //循环每一个节点
//                if (this.aNodes[n].id == pid) {  //如果循环的节点的id等于PID
//                    document.getElementById("c" + this.obj + pid).checked = true; //那么这个循环的节点应该被选中
//                    pid = this.aNodes[n].pid;
////                    this.aNodes[pid]._is=true;//设置父节点选中
//                    //           this.aNodes[this.aNodes[n]._p._ai]._is=true;
//                    //       alert("@@@@@@@@@@@"+this.aNodes[n]._p._ai)
//                    this.addSelectedNode(this.aNodes[n]._p._ai);
//                    bSearch = true;
//                    break;
//                }
//            }
//        } while (bSearch == true);
//    }
//
//    if (cs == false) {      //如果被取消选择
//        var pid = nodePid;
////        node._is=false;
//        do {
//            for (j = 0; j < len; j++) {         //循环每一个多选框  如果这个节点的子节点有其他是选中的,则不取消
//                if (this.aNodes[j].pid == pid && document.getElementById("c" + this.obj + this.aNodes[j].id).checked == true) {
//                    return;
//                }
//            }
//            if (j == len) {   //循环结束
//                for (k = 0; k < len; k++) {
//                    if (this.aNodes[k].id == pid) {   //如果找到父节点
//                        document.getElementById("c" + this.obj + this.aNodes[k].id).checked = false;
//                        pid = this.aNodes[k].pid;
//                        break;
//                    }
//                }
//            }
//        } while (pid != -1);
//    }
};
// If Push and pop is not implemented by the browser
if (!Array.prototype.push) {
    Array.prototype.push = function array_push() {
        for (var i = 0; i < arguments.length; i++)
            this[this.length] = arguments[i];
        return this.length;
    }
}
if (!Array.prototype.pop) {
    Array.prototype.pop = function array_pop() {
        var lastElement = this[this.length - 1];
        this.length = Math.max(this.length - 1, 0);
        return lastElement;
    }
}

/**
 * 基于dtree的angularjs版tree
 *
 * 注意一级节点的父节点ID要为-1
 *
 * example：
 * <div class="tree" uv-tree="funcs" uv-tree-data="funcs" uv-tree-node-id-key="func_code"
 * uv-tree-node-parent-id-key="par_func_code" uv-tree-node-name-key="func_name" uv-tree-node-selected-key="selected"
 * uv-tree-multi-select="true">
 * </div>
 *
 *
 */
angular.module('uv.directive.tree', [])
    .provider('uvTree', [function () {
        var imgFolder = "./img";
        return {
            setImgFolder: function (imgFolderPath) {
                imgFolder = imgFolderPath;
            },
            $get: function () {
                return {
                    imgFolder: imgFolder,
                    defaultTreeName: '_tree_3380915',
                    getTree: function (treeName) {
                        return {
                            getSelected: function () {
                                return window[treeName] ? window[treeName].getSelected() : null;
                            }
                        }
                    }
                }
            }
        }
    }])
    .directive('uvTree', ['$timeout', 'uvTree', function ($timeout, uvTree) {
        return {
            restrict: 'A',
            template: '<div></div>',
            scope: {
                uvTreeData: '=',            //tree的源数据
                uvTreeNodeIdKey: '@',       //tree节点的json对象中表示id的key
                uvTreeNodeParentIdKey: '@', //tree节点的json对象中表示父节点ID的key
                uvTreeNodeNameKey: '@',     //tree节点的json对象中表示名称的key
                uvTreeNodeSelectedKey: '@', //tree节点的json对象中表示当前节点应该已被默认选中的key
                uvTreeMultiSelect: '@',     //tree是否支持多选，现在单选有点问题,20160615解决
                uvTreeSelectNodeFunc: '@'   //click某个节点时,调用的func。一个入参:节点数据对象
            },
            link: function ($scope, elem, attr) {
                $scope.$watch('uvTreeData', function (v) {
                    if (v) {
                        var treeScopeName = attr.uvTree || uvTree.defaultTreeName;
                        var selectNodeFn;
                        if ($scope.uvTreeSelectNodeFunc) {
                            selectNodeFn = $scope.$parent[$scope.uvTreeSelectNodeFunc.split('(')[0]];
                        }
                        window[treeScopeName] = new dTree(treeScopeName, uvTree.imgFolder);
                        $scope.$parent[treeScopeName] = window[treeScopeName];
                        window[treeScopeName].config.multiSelect = !!$scope.uvTreeMultiSelect;
                        window[treeScopeName].config.checkbox = !!$scope.uvTreeMultiSelect;
                        window[treeScopeName].config.useIcons = false;
                        var id = $scope.uvTreeNodeIdKey,
                            pid = $scope.uvTreeNodeParentIdKey,
                            name = $scope.uvTreeNodeNameKey,
                            selectKey = $scope.uvTreeNodeSelectedKey;

                        window[treeScopeName + "_selectNode"] = function (id) {
                            if (selectNodeFn) {
                                selectNodeFn($scope.treeJSON[id]);
                            }
                        };

                        $scope.treeJSON = {};
                        angular.forEach($scope.uvTreeData, function (v) {
                            $scope.treeJSON[v[id]] = v;
                            window[treeScopeName].add(v[id], v[pid], v[name], 'javascript:' + treeScopeName + '_selectNode(' + v[id] + ');', '', v[selectKey], v, true);
                        });
                        var treeHtml = window[treeScopeName].toString();
                        elem.html(treeHtml);
                    }

                }, true);
            }
        }
    }]);
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