import CryptoJS from 'crypto-js'


function _debounce(fn, wait = 500) {
    let timer, startTimeStamp = 0;
    let context, args;

    let run = (timerInterval) => {
        timer = setTimeout(() => {
            let now = (new Date()).getTime();
            let interval = now - startTimeStamp
            if (interval < timerInterval) { // the timer start time has been reset, so the interval is less than timerInterval
                startTimeStamp = now;
                run(wait - interval);  // reset timer for left time 
            } else {
                fn.apply(context, args);
                clearTimeout(timer);
                timer = null;
            }

        }, timerInterval);
    }

    return function () {
        context = this;
        args = arguments;
        let now = (new Date()).getTime();
        startTimeStamp = now;

        if (!timer) {
            run(wait);    // last timer alreay executed, set a new timer
        }

    }
}

function dateFormat(fmt, date) {
    if(!date) return
    date = new Date(date)
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        }
    }
    return fmt;
}
function encrypt(word) {
    const keyStr = 'jiangbeiMedical1'
    const key = CryptoJS.enc.Utf8.parse(keyStr)
    var srcs = CryptoJS.enc.Utf8.parse(word)
    var encrypted = CryptoJS.AES.encrypt(srcs, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
    return encrypted.toString();
}
export {
    dateFormat,
    encrypt,
    _debounce
}