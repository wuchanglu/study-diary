function myResponse(data = {}, getDoing = () => {}, setDoing = () => {}) {
  return new Proxy(data, {
    set(data, key, newVal, self) {
      setDoing(newVal);
      return Reflect.set(data, key, newVal);
    },
    get(data, key, self) {
      getDoing(data[key]);
      if (typeof data[key] === "object") {
        return myResponse(data[key], getDoing, setDoing);
      } else {
        return Reflect.get(data, key, self);
      }
    }
  });
}
// function* testGenerator(one) {
//   console.log(one)
//   let two = 5 + (yield(one))
//   console.log(two)
//   let three = 100*(yield(two+1))
//   return one+two+three
// }
// var it = testGenerator(1)
// console.log(it.next())
// console.log(it.next(3))
// console.log(it.next(100))

var p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
});
var p4 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(2);
  }, 4000);
});
var p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(3);
  }, 2000);
});
var p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(8);
  }, 2000);
});
Promise.all([p1, p2, p3, p4]).then(res => {
  console.log(res);
});
