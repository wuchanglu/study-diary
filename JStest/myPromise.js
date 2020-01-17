const PENDING = "pending";
const RESOLVED = "resolved";
const REJECTED = "rejected";
var dataList = [];
var thenList = [];
function MyPromise(fn) {
  const that = this;
  that.state = PENDING;
  that.value = null;
  that.resolvedCallbacks = [];
  that.rejectedCallbacks = [];

  // 待完善 resolve 和 reject 函数
  // 待完善执行 fn 函数
  function resolve(value) {
    dataList.push(that);
    // console.log(value);
    if (value instanceof MyPromise) {
      value.then(resolve, reject);
      //
      //
      return;
    }
    if (that.state === PENDING) {
      that.state = RESOLVED;
      that.value = value;
      that.resolvedCallbacks.map(cb => cb(that.value));
    }
    return that;
  }

  function reject(value) {
    if (that.state === PENDING) {
      that.state = REJECTED;
      that.value = value;

      that.rejectedCallbacks.map(cb => cb(that.value));
    }
  }
  try {
    fn(resolve, reject);
  } catch (e) {
    reject(e);
  }
}
MyPromise.prototype.then = function(onFulfilled, onRejected) {
  const that = this;
  thenList.push(that);
  onFulfilled = typeof onFulfilled === "function" ? onFulfilled : v => v;
  onRejected =
    typeof onRejected === "function"
      ? onRejected
      : r => {
          throw r;
        };
  if (that.state === PENDING) {
    that.resolvedCallbacks.push(onFulfilled);
    that.rejectedCallbacks.push(onRejected);
  }
  if (that.state === RESOLVED) {
    onFulfilled(that.value);
    console.log(that, onFulfilled(that.value));
  }
  if (that.state === REJECTED) {
    onRejected(that.value);
  }
};
var xx = "";
var p1 = new MyPromise(function(resolve) {
  setTimeout(() => {
    xx = new MyPromise(resolve => {
      resolve(5);
    });
    resolve(xx);
  }, 0);
});
p1.then(res => {
  //   console.log("final", res);
});


