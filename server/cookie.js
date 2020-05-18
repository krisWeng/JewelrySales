/**
 * 
 * @param {string} name cookie 名
 * @param {string} value 值
 * @param {int} days 过期天数
 */
export function setCookie (name, value, days) {
    var d = new Date;
    d.setTime(d.getTime() + 24*60*60*1000*days);
    window.document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
}

/**
 * 获取cookie
 * @param {string} name 键
 */
export function getCookie (name) {
    var v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}

/**
 * todo 删除cookie
 * @param {string} name 键
 */
export function delCookie (name) {
    setCookie(name, '', -1);
}