/* 工具类 */

/**
 * @summary 根据时间及格式获取时间的字符串
 * @param {int} iDate 时间
 * @param {string} sFormat 格式，默认：yyyy-MM-dd HH:mm:ss
 * @return {string} 格式化后的日期字符串
 * @example
 *    formatDate(new Date(),'yyyy-MM-dd HH:mm:ss SSS');// 2017-6-6 11:11:11
 */
export const formatDate = (iDate, sFormat = 'yyyy-MM-dd HH:mm:ss') => {
  if (!iDate) { return ''; }
  let dDate = new Date(iDate);
  let year = dDate.getFullYear();// 年
  let month = dDate.getMonth() + 1;// 月
  if (month < 10) { month = '0' + month; }
  let date = dDate.getDate();// 日
  if (date < 10) { date = '0' + date; }
  let hour = dDate.getHours();// 时
  if (hour < 10) { hour = '0' + hour; }
  let minute = dDate.getMinutes();// 分
  if (minute < 10) { minute = '0' + minute; }
  let second = dDate.getSeconds();// 秒
  if (second < 10) { second = '0' + second; }
  let millisecond = dDate.getMilliseconds();// 毫秒
  if (sFormat.indexOf('yyyy') >= 0) { sFormat = sFormat.replace('yyyy', year + ''); }
  if (sFormat.indexOf('MM') >= 0) { sFormat = sFormat.replace('MM', month + ''); }
  if (sFormat.indexOf('dd') >= 0) { sFormat = sFormat.replace('dd', date + ''); }
  if (sFormat.indexOf('HH') >= 0) { sFormat = sFormat.replace('HH', hour + ''); }
  if (sFormat.indexOf('mm') >= 0) { sFormat = sFormat.replace('mm', minute + ''); }
  if (sFormat.indexOf('ss') >= 0) { sFormat = sFormat.replace('ss', second + ''); }
  if (sFormat.indexOf('SSS') >= 0) { sFormat = sFormat.replace('SSS', millisecond + ''); }
  return sFormat;
};
/**
 * 转化时间
 * @param {String} str
 * @returns {String} 转化后的时间
 */
export const transDate = (str) => {
  if (!str) return '';
  let date = new Date(str)
  // 现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
  let time = new Date().getTime() - date.getTime();
  if (time < 0) {
    return '';
  } else if ((time / 1000 < 30)) {
    return '刚刚';
  } else if (time / 1000 < 60) {
    return parseInt((time / 1000)) + '秒前';
  } else if ((time / 60000) < 60) {
    return parseInt((time / 60000)) + '分钟前';
  } else if ((time / 3600000) < 24) {
    return parseInt(time / 3600000) + '小时前';
  } else if ((time / 86400000) < 31) {
    return parseInt(time / 86400000) + '天前';
  } else if ((time / 2592000000) < 12) {
    return parseInt(time / 2592000000) + '月前';
  } else {
    return parseInt(time / 31536000000) + '年前';
  }
};
/**
 * @summary 设置cookie
 * @param {string} name cookie名称
 * @param {string} value cookie值
 * @param {int} expires 保存时间(单位:小时)
 * @param {string} path
 * @param {string} domain
 * @param {string} secure
 */
export const setCookie = (name, value, expires, path, domain, secure) => {
  let str = name + '=' + encodeURIComponent(value);
  if (expires > 0) {
    let date = new Date();
    date.setTime(date.getTime() + expires * 3600 * 1000);
    str += ';expires=' + date.toGMTString();
  }
  if (path) { str += ';path=' + path; }
  if (domain) { str += ';domain=' + domain; }
  if (secure) { str += ';secure=' + secure; }
  document.cookie = str;
};
/**
 * @summary 读取cookie
 * @param {string} name cookie名称
 * @retrun {string} value cookie值
 * @example
 */
export const getCookie = (name) => {
  let start = document.cookie.indexOf(name + '=');
  if ((!start) && (name !== document.cookie.substring(0, name.length))) { return ''; }
  if (start === -1) { return ''; }
  let len = start + name.length + 1;
  let end = document.cookie.indexOf(';', len);
  if (end === -1) { end = document.cookie.length; }
  return decodeURIComponent(document.cookie.substring(len, end));
};
/**
 * 存储localStorage
 * @param {string} sName
 * @param {string} sCntent
 * @example setLocalStore('name', '测试');
 */
export const setLocalStore = (sName, sCntent) => {
  if (!sName) return;
  window.localStorage.setItem(sName, sCntent);
};

/**
 * 获取localStorage
 */
export const getLocalStore = name => {
  if (!name) return null;
  return window.localStorage.getItem(name);
};
/**
* 删除cookie
*/
export const delCookie = (name, expires) => {
  let exp = new Date();
  exp.setTime(exp.getTime() - expires * 3600 * 1000);
  const cval = getCookie(name);
  if (cval != null) {
    const str = name + '=' + encodeURIComponent(cval) + ';expires=' + exp.toGMTString() + ';path=/';
    document.cookie = str;
  }
};
// 将分钟转换为时分秒格式
export const changeTime = (num) => { // num单位为分钟
  console.log(num)
  let h, m, s = num / 1000;
  if (isNaN(parseInt(num))) {
    return '-';
  }
  if (s > 60) { // 如果秒数大于60，则将秒数转为分钟
    m = parseInt(s / 60); // 获取分钟
    s = parseInt(s % 60);
    if (m > 60) { // 如果分钟大于60，则将分钟转为小时
      h = parseInt(m / 60);
      m = parseInt(m % 60);
    }
  }
  let result = s.toFixed(1) + '秒';
  if (m > 0) {
    if (s === 0) {
      result = parseInt(m) + '分钟';
    } else {
      result = parseInt(m) + '分钟' + parseInt(s) + '秒';
    }
  }
  if (h > 0) {
    if (s === 0) {
      result = parseInt(h) + '小时' + parseInt(m) + '分钟';
    } else {
      result = parseInt(h) + '小时' + parseInt(m) + '分钟' + parseInt(s) + '秒';
    }
    // result = parseInt(h) + '小时' + parseInt(m) + '分钟' + parseInt(s) + '秒';
  }
  return result;
};
