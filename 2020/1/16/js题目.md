```
//表达式里面的函数定义就不是函数定义了
var x = 1;
if (function f() {}) {
  x += typeof f;
}
console.log(x);
```