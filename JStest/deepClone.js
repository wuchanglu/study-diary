// 深拷贝
function deepClone(data, uniqueList = []) {
  const toDoByType = {
    Array: cloneArray,
    Object: cloneObject,
    Date: cloneDate
  };
  const type = getType(data);
  return toDoByType[type] ? toDoByType[type](data, uniqueList) : data;
}
// 获取数据类型
function getType(data) {
  return Object.prototype.toString.call(data).slice(8, -1);
}
// 拷贝对象
function cloneObject(data, uniqueList) {
  if (uniqueList.indexOf(data) !== -1) {
    return data;
  } else {
    uniqueList.push(data);
    let obj = {};
    Object.keys(data).forEach(key => {
      obj[key] = deepClone(data[key], uniqueList);
    });
    return obj;
  }
}
// 拷贝数组
function cloneArray(data) {
  return data.map(item => {
    return deepClone(item);
  });
}
// 拷贝日期
function cloneDate(data) {
  return new Date(data.valueOf());
}
module.exports = { deepClone };
// 实验
let obj = {
  a: 1,
  b: {
    c: 2
  },
  e: function() {
    console.log(1234);
  }
};
// 假设obj.b的指针值为1，obj.b.d指针值也为1
// obj1.b指针值为2，obj1.b.d指针值因为find的原因所以指向了obj.b.d的指针值1
obj.b.d = obj.b;
let obj1 = deepClone(obj);

console.log(obj1);
console.log(obj1.b.d === obj.b.d);
// 基于messageChanle的深拷贝
function deepCloneByMC(obj) {
  return new Promise((resolve, reject) => {
    const { port1, port2 } = new MessageChannel();
    port1.onmessage = e => resolve(e);
    port2.postMessage(obj);
  });
}
