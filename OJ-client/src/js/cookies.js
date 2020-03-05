/**
 * Created by zx on 2017/9/21.
 */
class Cookie {
    set(name, value, days) {
        var d = new Date;
        d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
        window.document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
    }

    get(name) {
        var v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return v ? v[2] : null;
    }

    delete(name) {
        this.set(name, '', -1);
    }

}
export let cookie = new Cookie();