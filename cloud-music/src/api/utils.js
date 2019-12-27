//src/api/utils.js
export const getCount = count => {
  if (count < 0) return;
  if (count < 10000) {
    return count;
  } else if (Math.floor(count / 10000) < 10000) {
    return Math.floor(count / 1000) / 10 + "万";
  } else {
    return Math.floor(count / 10000000) / 10 + "亿";
  }
};
export const initConsole = () => {
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "//cdn.jsdelivr.net/npm/eruda";
  if (script.readyState) {
    // IE
    script.onreadystatechange = function() {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        window.eruda.init();
        console.log("控制台打印信息");
      }
    };
  } else {
    // 其他浏览器
    script.onload = function() {
      window.eruda.init();
      console.log("控制台打印信息");
    };
  }
  document.body.appendChild(script);
};
