import hosts from '@/utils/hosts'
import axios from "axios";
Vue.prototype.$axios = axios;
// axios.defaults.withCredentials = true;


// 类型扩展
Date.prototype.Format = function(fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
String.prototype.trim = function() {
    var reExtraSpace = /^\s*(.*?)\s+$/;
    return this.replace(reExtraSpace, "$1")
}

// refreshRem
function rem() {
    var win = window;
    var doc = win.document;
    var docEl = doc.documentElement;
    var tid;

    function refreshRem() {
        var width = docEl.clientWidth;
        var height = docEl.clientHeight;
        // if ((width / height) > (750 / 1125)) {
        // var rem = height / (1125 / 50);
        // } else {
        var rem = width / (750 / 50);
        // }
        docEl.style.fontSize = rem + 'px';
    }
    win.addEventListener('resize', function() {
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 300);
    }, false);
    win.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }
    }, false);
    return refreshRem()
}
// 变量判断空
function empty(v) {
    switch (typeof v) {
        case 'undefined':
            return true;
        case 'string':
            if (v.trim().length == 0) return true;
            break;
        case 'boolean':
            if (!v) return true;
            break;
        case 'number':
            if (0 === v) return true;
            break;
        case 'object':
            if (null === v) return true;
            if (undefined !== v.length && v.length == 0) return true;
            for (var k in v) { return false; }
            return true;
            break;
    }
    return false;
}

function serialize(data) {
    var serializeArray = []
    for (var keys in data) {
        serializeArray.push({
            "name": keys,
            "value": data[keys]
        })
    }
    var result = []
    serializeArray.forEach(function(item) {
        result.push(encodeURIComponent(item.name) + '=' + encodeURIComponent(item.value))
    })
    return result.join("&")
}


function getQueryString(e, t) {
    var n = window.location.search || "?" + window.location.href.split("?")[1]
        , r = ""
        , i = {};
    if (t)
        r = t.split("?")[1].split("&");
    else {
        if (!n)
            return;
        r = n.substr(1).split("&")
    }
    for (var o = 0; o < r.length; o++) {
        var a = r[o].indexOf("=");
        i[r[o].slice(0, a)] = r[o].slice(a + 1)
    }
    return e ? i[e] : t ? i[e] : i
}

function getHosts(rawHosts) {
    var hosts = {}
    for (var host in rawHosts) {
        hosts[host] = rawHosts[host][env]
    }
    return hosts
}

function jsonp(opts) {

    var count = 0;

    function noop() {}

    function _jsonp(opts) {
        var url = opts.url;
        var fn = opts.callback;

        if ('function' == typeof opts) {
            fn = opts;
            opts = {};
        }
        if (!opts) opts = {};

        var prefix = opts.prefix || '__jp';
        var id = opts.jsonpCallback || (prefix + (count++));

        var param = serialize(opts.data) || '';
        var timeout = null != opts.timeout ? opts.timeout : 60000;
        var enc = encodeURIComponent;
        var target = document.getElementsByTagName('script')[0] || document.head;
        var script;
        var timer;

        if (timeout) {
            timer = setTimeout(function() {
                cleanup();
                if (fn) fn(new Error('Timeout'));
            }, timeout);
        }

        function cleanup() {
            if (script.parentNode) script.parentNode.removeChild(script);
            window[id] = noop;
            if (timer) clearTimeout(timer);
        }

        function cancel() {
            if (window[id]) {
                cleanup();
            }
        }

        window[id] = function(data) {
            cleanup();
            if (fn) fn(data);
        };

        if (param) url += (~url.indexOf('?') ? '&' : '?') + param;
        url = url.replace('?&', '?');

        script = document.createElement('script');
        script.src = url;
        target.parentNode.insertBefore(script, target);

        return cancel;
    }
    return _jsonp(opts)
}

export default {
    rem,
    empty,
    serialize,
    getQueryString,
    getHosts,
    jsonp

}