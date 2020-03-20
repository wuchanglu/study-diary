Function.prototype.myApply = function(target, args) {
  target = target || window;
  target.myFn = this;
  console.log(target);
  var res = target.myFn(...args);
  delete target.myFn;
  return res;
};
Function.prototype.myCall = function(target, ...args) {
  target = target || window;
  target.myFn = this;
  var res = target.myFn(...args);
  delete target.myFn;
  return res;
};
Function.prototype.myBind = function(target) {
  const self = this;
  const fn = function(...args) {
    if (this instanceof fn) {
      return new self(...args);
    }
    return self.myApply(target, args);
  };
  return fn;
};
// function test(a,b,c){
//     this.a=a
//     this.b=b
//     this.c=c
//     console.log(this,a,b,c)
// }
// var a = test.myBind({a:11})
// var x= new a(1,2,3)
// console.log(x)
// test.myCall({},1,2,3)
// test.myApply({},[1,2,3])
function myNew(con, ...args) {
  var target = {};
  target.__proto__ = con.prototype;
  var res = con.apply(target, args);
  return res instanceof Object ? res : target;
}

function myInstanceof(left, right) {
  let proto = Object.getPrototypeOf(left);
  const prototype = right.prototype;
  while (true) {
    if (proto === prototype) {
      return true;
    }
    if (proto == null) {
      return false;
    }
    proto = Object.getPrototypeOf(proto);
  }
}
function person() {
  this.a = 11;
}
var p = new person();
console.log(myInstanceof(p, Object));
console.log(myInstanceof(p, person));
console.log(myInstanceof({}, person));
