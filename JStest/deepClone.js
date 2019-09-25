function deepClone(data, uniqueList) {
  if (!uniqueList) uniqueList = [];
  switch (getType(data)) {
    case "Array":
      return data.map(item => {
        return deepClone(item);
      });
    case "Object":
      if (find(uniqueList, data)) {
        return data;
      } else {
        uniqueList.push(data);
        let obj = {};
        Object.keys(data).forEach(key => {
          obj[key] = deepClone(data[key], uniqueList);
        });
        return obj;
      }

    case "Date":
      return new Date(data.valueOf());
    default:
      return data;
  }
}
function getType(data) {
  return Object.prototype.toString.call(data).slice(8, -1);
}
function find(arr, item) {
  let times = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === item && times >= 1) {
      return true;
    } else if (arr[i] === item && times === 0) {
      times++;
    }
  }
  return false;
}

let obj = {
  a: 1,
  b: {
    c: 2
  }
};
// 假设obj.b的指针值为1，obj.b.d指针值也为1
// obj1.b指针值为2，obj1.b.d指针值因为find的原因所以指向了obj.b.d的指针值1
obj.b.d = obj.b;
let obj1 = deepClone(obj);

console.log(obj1);
console.log(obj1.b.d === obj.b.d);
