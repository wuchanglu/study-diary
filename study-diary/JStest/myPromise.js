const PENDING = "pending";
const RESOLVED = "resolved";
const REJECTED = "rejected";
function MyPromise(fn) {
  // 创建常量that，用与获取正确的this
  const that = this;
  that.state = PENDING;
  that.value = null;
  that.resolvedCallbacks = [];
  that.rejectedCallbacks = [];
  //   成功的回调函数
  function resolve(value) {
    console.log('value',value);
    if (value instanceof MyPromise) {
      console.log('then',value.then(resolve, reject));
      return value.then(resolve, reject);
    }
    setTimeout(() => {
      if (that.state === PENDING) {
        that.state = RESOLVED;
        that.value = value;
        //   这边回调的遍历执行我选择forEach,选择原因是执行速度,原先的是map
        that.resolvedCallbacks.forEach(cb => {
          cb(that.value);
        });
      }
    }, 0);
  }
  //   失败的回调函数
  function reject(value) {
    setTimeout(() => {
      if (that.state === PENDING) {
        that.state = REJECTED;
        that.value = value;
        //   这边回调的遍历执行我选择forEach,选择原因是执行速度,原先的是map
        that.rejectedCallbacks.forEach(cb => cb(that.value));
      }
    }, 0);
  }
  //   两个函数的逻辑相似，先判断状态是否为等待中，是的话改变状态，遍历对应的回调函数列表并以value作为入参依次执行
  //   执行函数，将resolve和reject作为入参传入
  try {
    fn(resolve, reject);
  } catch (error) {
    reject(error);
  }
}
function resolutionProcedure(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError("Error"));
  }
  if (x instanceof MyPromise) {
    x.then(function(value) {
      resolutionProcedure(promise2, value, resolve, reject);
    }, reject);
  }
  let called = false;
  if (x !== null && (typeof x === "object" || typeof x === "function")) {
    try {
      let then = x.then;
      if (typeof then === "function") {
        then.call(
          x,
          y => {
            if (called) return;
            called = true;
            resolutionProcedure(promise2, y, resolve, reject);
          },
          e => {
            if (called) return;
            called = true;
            reject(e);
          }
        );
      } else {
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
}
// 设置then，先判断then的入参，不是函数的话设置一个默认函数。然后判断状态，状态依旧为等待中的话就把入参放入定义的回调事件列表内，否则就立即执行对应状态的函数，入参为 value
MyPromise.prototype.then = function(onFulfilled, onRejected) {
  const that = this;
  onFulfilled = typeof onFulfilled === "function" ? onFulfilled : v => v;
  onRejected =
    typeof onRejected === "function"
      ? onRejected
      : r => {
          throw r;
        };
  if (that.state === PENDING) {
    // that.resolvedCallbacks.push(onFulfilled);
    // that.rejectedCallbacks.push(onRejected);
    return (promise2 = new MyPromise((resolve, reject) => {
      that.resolvedCallbacks.push(() => {
        try {
          const x = onFulfilled(that.value);
          resolutionProcedure(promise2, x, resolve, reject);
        } catch (r) {
          reject(r);
        }
      });
      that.rejectedCallbacks.push(() => {
        try {
          const x = onRejected(that.value);
          resolutionProcedure(promise2, x, resolve, reject);
        } catch (r) {
          reject(r);
        }
      });
      // console.log(that.resolvedCallbacks);
    }));
  }
  if (that.state === RESOLVED) {
    return (promise2 = new NyPromise((resolve, reject) => {
      setTimeout(() => {
        try {
          const x = onFulfilled(that.value);
          resolutionProcedure(promise2, x, resolve, reject);
        } catch (reason) {
          reject(reason);
        }
      }, 0);
    }));
  }
  if (that.state === REJECTED) {
    onRejected(that.value);
  }
};
// new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     //  因为是直接调用函数所以resolve里面的this会指向window
//     resolve(1);
//   }, 1000);
// })
//   .then(value => {
//     setTimeout(() => {
//       console.log(2);
//       resolve(2);
//     }, 1000);
//   })
//   .then(res => {
//     console.log(res);
//   });
// var p2 = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(
//       new MyPromise((resolve, reject) => {
//         resolve(12);
//       }).then(res => {
//         console.log(2, res);
//       })
//     );
//   }, 1000);
// }).then(res => {
//   console.log(1, res);
// });
var p2 = new MyPromise((resolve, reject) => {
  resolve(
    new MyPromise(res => {
      resolve(2);
    }).then(res => {
      return 3;
    })
  );
}).then(res => {
  console.log("final", res);
});
