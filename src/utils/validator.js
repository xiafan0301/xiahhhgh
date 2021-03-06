/*
* rule
*  可自定义属性
*/
// ipv4
export const checkIp4 = (rule, value, callback) => {
  if (value) {
    let reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    if (!reg.test(value)) {
      return callback(new Error('请输入有效的IP地址'));
    }
  }
  callback();
};
// ipv4
export const checkGps = (rule, value, callback) => {
  if (value) {
    let aGps = value.split(',');
    let longitude = aGps[0], latitude = aGps[1];
    let lon = /^-?((0|[1-9]\d?|1[1-7]\d)(\.\d{1,7})?|180(\.0{1,7})?)?$/;
    let lat = /^-?((0|[1-8]\d|)(\.\d{1,7})?|90(\.0{1,7})?)?$/;
    let lonRe = new RegExp(lon), latRe = new RegExp(lat);
    // alert(lonRe.test(longitude)); // 返回true OR  false
    if (!lonRe.test(longitude)) {
      return callback(new Error('经度不符合规范：经度整数部分为0-180,小数部分为0-6位！'));
    }
    if (!latRe.test(latitude)) {
      return callback(new Error('纬度不符合规范：纬度整数部分为0-90,小数部分为0-6位！'));
    }
  }
  callback();
};
export const keywords = (rule, value, callback) => {
  if (value) {
    let keywords = value.split(',');
    if (keywords.length > 3) {
      return callback(new Error('最多添加3个关键词'));
    }
  }
  callback();
};
// 验证手机号
export const valiPhone = (rule, value, callback) => {
  if (value) {
    let reg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!reg.test(value)) {
      return callback(new Error('请输入正确的手机号码'));
    }
  }
  callback();
};
// 验证经纬度
export const valicoordinate = (rule, value, callback) => {
  if (value.split(',')[0] > 180) {
    callback(new Error('经度必须少于180'));
  } else {
    if (value.split(',')[1] > 90) {
      callback(new Error('纬度必须少于90'));
    }
  }
  if (!Number.isInteger(value.split(',')[0])) {
    callback(new Error('经度必须为数字'));
  } else if (!Number.isInteger(value.split(',')[1])) {
    callback(new Error('纬度必须为数字'));
  }
  callback();
};
// 电话手机号码验证
export const checkTel = (rule, value, callback) => {
  if (value) {
    let reg = /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
    if (!reg.test(value)) {
      callback(new Error('手机格式不正确'));
    } else {
      callback();
    }
  }
  callback()
}
// 电话手机号码验证
export const checkZel = (rule, value, callback) => {
  if (value) {
    let reg = /^(\d{8}|\d{11})$/;
    if (!reg.test(value)) {
      callback(new Error('手机格式不正确'));
    } else {
      callback();
    }
  }
  callback()
}
// 密码验证
export const checkPwd = (rule, value, callback) => {
  if (value) {
    let reg = /^[a-zA-Z0-9]{6,32}$/;
    if (!reg.test(value)) {
      callback(new Error('密码为6-32个数字或英文字母组合'));
    } else {
      callback();
    }
  }
  callback()
}
/**
 * 判断邮箱格式
 */
export const checkEmail = (rule, value, callback) => {
  if (value) {
    let reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
    if (!reg.test(value)) {
      callback(new Error('邮箱格式填写错误'));
    } else {
      callback();
    }
  }
  callback()
}

/**
 * 判断身份证验证
 */
export const checkIdCard = (rule, value, callback) => {
  if (value) {
    let reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    if (!reg.test(value)) {
      callback(new Error('身份证格式不正确'));
    } else {
      callback();
    }
  }
  callback()
}
// 验证定时时间

export const checkTime = (rule, value, callback) => {
  if (value) {
    console.log(rule)
    if (!(new Date(value) - Date.now() > 3 * 60 * 1000)) {
      return callback(new Error('经度不符合规范：经度整数部分为0-180,小数部分为0-6位！'));
    }
  }
  callback()
}
/**
* 只能是10以内的数字，最多一位小数
*/
export const valiNumber = (rule, value, callback) => {
  let numReg = /^([0-9])(\.[0-9])?$/;
  if (!numReg.test(value)) {
    return callback(new Error('请输入10以内的数字,且最多一位小数点'));
  }
}
