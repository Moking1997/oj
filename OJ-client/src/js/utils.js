const salt = 'd93aa3f6'
import md5 from 'js-md5';
export const pwdMD5 = function (pwd) {
    let pwdSalted = pwd + salt
    let pwdMD5 = md5(pwdSalted)
    // log('pwdMD5', pwdMD5)
    return pwdMD5
}


Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}

// const unlockLog = function () { }
// export const log = unlockLog.bind(unlockLog)
export const log = console.log.bind(console)

