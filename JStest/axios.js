// 文件默认导出请求函数，入参为：路径、入参、响应类型（选填）,函数内根据公司内部产品的请求校验规则做了参数处理
// 额外导出了参数加密处理
import axios from "axios";
import md5 from "md5";

let baseUrl =
  process.env.NODE_ENV === "production"
    ? "需要替换的url"
    : "/manage";
switch (process.env.EVN_CONFIG) {
  case "test":
    baseUrl = "需要替换的url";
    break;
}

let isLoading = false;
let http = axios.create({
  baseURL: baseUrl,
  // 跨域请求时是否需要使用凭证
  withCredentials: true,
  // 即将被发送的自定义请求头
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
  },
  //   在向服务器发送前，处理请求数据
  transformRequest: [
    function(data) {
      let newData = "";
      for (let k in data) {
        if (data.hasOwnProperty(k) === true) {
          newData +=
            encodeURIComponent(k) + "=" + encodeURIComponent(data[k]) + "&";
        }
      }
      return newData;
    }
  ]
});
  function uncodeUtf16(str) {
    var reg = /\&#.*?;/g;
    var result = str.replace(reg, function(char) {
      var H, L, code;
      if (char.length == 9) {
        code = parseInt(char.match(/[0-9]+/g));
        H = Math.floor((code - 0x10000) / 0x400) + 0xd800;
        L = ((code - 0x10000) % 0x400) + 0xdc00;
        return unescape("%u" + H.toString(16) + "%u" + L.toString(16));
      } else {
        return char;
      }
    });
    return result;
  }
function apiAxios(method, url, params, type) {
  // params = JSON.parse(utf16toEntities(JSON.stringify(params)));
  switch (method) {
    case "GET":
      url = encryption(url, params, "GET");
      break;
    case "POST":
      params.sign = encryption(url, params, "POST");
      break;
  }
  if (method === "POST") {
    isLoading = true;
  }
  return http({
    method: method,
    url: url,
    data: method === "POST" || method === "PUT" ? params : null,
    responseType: type
  }).then(res => {
    const data = JSON.parse(uncodeUtf16(JSON.stringify(res.data)));
    isLoading = false;
    return Promise.resolve(data);
  });
}
// 加密处理,如果是get返回拼接后的url如果是post只返回sign值
function encryption(url, params, methods) {
  Object.keys(params).forEach(key => {
    if (params[key] == undefined) {
      delete params[key];
    } else if (typeof params[key] === "string") {
      params[key] = params[key].replace(/<script>.*<\/script>/g, "");
    }
  });

  params.app_id = "zaiuk_food_merchant";
  params.time_stamp = new Date().getTime();
  params.nonce_str = randomString();
  var tempParam = sort_ASCII(params);
  let str = objSplit(tempParam);
  let strSignTemp = str + "&app_secret=7DC7B8187520CAE3759D6DC06FEB33EA";
  let sign = md5(strSignTemp).toUpperCase();
  if (methods === "POST") {
    return sign;
  } else {
    return encodeURI(`${url}?${str}&sign=${sign}`);
  }
}
// 获取随机数字与字母组合的字符串
function randomString(len) {
  len = len || 31;
  var $chars = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm123456789";
  var maxPos = $chars.length;
  var pwd = "";
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}
// ascii码进行对象属性排序
function sort_ASCII(obj) {
  var arr = new Array();
  var num = 0;
  for (var i in obj) {
    arr[num] = i;
    num++;
  }
  var sortArr = arr.sort();
  var sortObj = {};
  for (var i in sortArr) {
    if (obj[sortArr[i]] !== "") {
      sortObj[sortArr[i]] = obj[sortArr[i]];
    }
  }
  return sortObj;
}
// 将参数拼接
function objSplit(obj) {
  let arry = [];
  Object.keys(obj).forEach(item => {
    arry.push(`${item}=${obj[item]}`);
  });
  return (str = arry.join("&"));
}
export default {
  post: function(url, params, type) {
    return !isLoading
      ? apiAxios("POST", url, params, type)
      : Promise.resolve({
          message: "正在请求",
          result: "正在发送请求,请不要操作过于频繁"
        });
  },
  get: function(url, params, type) {
    return apiAxios("GET", url, params, type);
  }
};
export { encryption };
