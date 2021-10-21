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
/**
     * 将图片file转换为img对象
     */
function readImg(file) {
    return new Promise((resolve, reject) => {
        const img = new Image()
        const reader = new FileReader()
        reader.readAsDataURL(file);
        reader.onload = function(e) {
            img.src = e.target.result
        }
        reader.onerror = function(e) {
            reject(e)
        }
        reader.readAsDataURL(file[0])
        img.onload = function() {
            resolve(img)
        }
        img.onerror = function(e) {
            reject(e)
        }
    })
    }
/**
    * 压缩图片
    * @param img 被压缩的img对象
    * @param mx 触发压缩的图片最大宽度限制
    * @param mh 触发压缩的图片最大高度限制
    */
function compressImg(file,img, mx, mh) {
    return new Promise((resolve, reject) => {
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        const { width: originWidth, height: originHeight } = img
        let dataURL = ''
        // 最大尺寸限制
        const maxWidth = mx
        const maxHeight = mh
        // 目标尺寸
        let targetWidth = originWidth
        let targetHeight = originHeight
        if (originWidth > maxWidth || originHeight > maxHeight) {
            if (originWidth / originHeight > 1) {
            // 宽图片
            targetWidth = maxWidth
            targetHeight = Math.round(maxWidth * (originHeight / originWidth))
            } else {
            // 高图片
            targetHeight = maxHeight
            targetWidth = Math.round(maxHeight * (originWidth / originHeight))
            }
        }
        canvas.width = targetWidth
        canvas.height = targetHeight
        context.clearRect(0, 0, targetWidth, targetHeight)
        // 图片绘制
        context.drawImage(img, 0, 0, targetWidth, targetHeight)
        // dataURL = canvas.toDataURL('image/jpeg') // 转换图片为dataURL
        // resolve(dataURL)
        // 转换为bolb对象
        canvas.toBlob(function(blob) {
          resolve(blob)
        }, file.type || 'image/png')
    })
}
var keyStr = "ABCDEFGHIJKLMNOP" +  
             "QRSTUVWXYZabcdef" +  
             "ghijklmnopqrstuv" +  
             "wxyz0123456789+/" +  
             "=";  
  
function encode64(input) {  
   input = escape(input);  
   var output = "";  
   var chr1, chr2, chr3 = "";  
   var enc1, enc2, enc3, enc4 = "";  
   var i = 0;  
  
   do {  
      chr1 = input.charCodeAt(i++);  
      chr2 = input.charCodeAt(i++);  
      chr3 = input.charCodeAt(i++);  
  
      enc1 = chr1 >> 2;  
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);  
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);  
      enc4 = chr3 & 63;  
  
      if (isNaN(chr2)) {  
         enc3 = enc4 = 64;  
      } else if (isNaN(chr3)) {  
         enc4 = 64;  
      }  
  
      output = output +   
         keyStr.charAt(enc1) +   
         keyStr.charAt(enc2) +   
         keyStr.charAt(enc3) +   
         keyStr.charAt(enc4);  
      chr1 = chr2 = chr3 = "";  
      enc1 = enc2 = enc3 = enc4 = "";  
   } while (i < input.length);  
  
   return output;  
}  
  
function decode64(input) {  
   var output = "";  
   var chr1, chr2, chr3 = "";  
   var enc1, enc2, enc3, enc4 = "";  
   var i = 0;  
  
   // remove all characters that are not A-Z, a-z, 0-9, +, /, or =  
   var base64test = /[^A-Za-z0-9\+\/\=]/g;  
   if (base64test.exec(input)) {  
      alert("There were invalid base64 characters in the input text.\n" +  
            "Valid base64 characters are A-Z, a-z, 0-9, '+', '/', and '='\n" +  
            "Expect errors in decoding.");  
   }  
   input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");  
  
   do {  
      enc1 = keyStr.indexOf(input.charAt(i++));  
      enc2 = keyStr.indexOf(input.charAt(i++));  
      enc3 = keyStr.indexOf(input.charAt(i++));  
      enc4 = keyStr.indexOf(input.charAt(i++));  
  
      chr1 = (enc1 << 2) | (enc2 >> 4);  
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);  
      chr3 = ((enc3 & 3) << 6) | enc4;  
  
      output = output + String.fromCharCode(chr1);  
  
      if (enc3 != 64) {  
         output = output + String.fromCharCode(chr2);  
      }  
      if (enc4 != 64) {  
         output = output + String.fromCharCode(chr3);  
      }  
  
      chr1 = chr2 = chr3 = "";  
      enc1 = enc2 = enc3 = enc4 = "";  
  
   } while (i < input.length);  
  
   return unescape(output);  
}
export default {
    rem,
    empty,
    serialize,
    getQueryString,
    getHosts,
    jsonp,
    compressImg,
    readImg,
    decode64,
    encode64
}