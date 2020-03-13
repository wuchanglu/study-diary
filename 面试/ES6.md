## 什么是提升？什么是暂时性死区？var、let 及 const 区别？

###

```
console.log(a) //undefined
var a= 11
```

上面就是变量 a 被提升了，为什么会有变量提升呢？

```
// 为了解决函数间相互调用的情况
function test1() {
    test2()
}
function test2() {
    test1()
}
test1()
```

提升的规则，先 var 再 function，function 是直接附上去，并且可以覆盖 var 的变量提升

###

const 和 let 有暂时性死区，必须先声明再使用，但是他们也有提升  
const 的值不可改变，let 的可以改变（const 如果是一个对象，然后去改变对象属性是不会报错的，涉及到了数据类型）

## 原型如何实现继承？Class 如何实现继承？Class 本质是什么？

```
function Parent(firstName){
    this.firstName=firstName||'chinese'
}
Parent.prototype.getFirstName=function(){return this.firstName}
<!-- 组合继承 -->
function Child(firstName,secondName){
    Parent.call(this,firstName)
    this.secondName=secondName
}
Child.prototype = new Parent()
<!-- 寄生组合继承 -->
function Child(firstName,secondName){
    Parent.call(this,firstName)
    this.secondName=secondName
}
Child.prototype =Object.create(Parent,{
    constructor:{
        value:Child,
        enumerable:false,
        writable:true,
        configurable:true
    }
})
```

```
class Parent{
    constructor(firstName){
        this.firstName=firstName
    }
    getFirstName(){
        return this.firstName
    }
}
class Child extends Parent{
    constructor(firstName,secondName){
        super(firstName)
        this.secondName=secondName
    }
}
```

class 的本质还是函数，只是一个语法糖罢了

## 为什么要使用模块化？都有哪几种方式可以实现模块化，各有什么特点？

### 模块化带来的好处

1. 解决命名冲突
2. 提供复用性
3. 提高代码可维护性

### AMD 和 CMD，ES6，CommonJS

CommonJS：

```
modules.export={
    a:1
}
<!-- or -->
export.a=1
<!-- 使用 -->
var module = require(url)
```

ES6:

```
export function a(){}
export default function(){}
<!-- 使用 -->
import {a} from 'url'
import a from 'url'
```

## Proxy 可以实现什么功能？

Proxy 是 ES6 新增的功能，它可以用来自定义对象中的操作

```
let p =new Proxy({a:11},{
        set:function(obj,key,newVal,this){},
        get:function(obj,key,this){}
    })
```

### 数据响应式实现

```
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
var test = myResponse(
  { a: 1, obj: { age: 18 } },
  value => {
    console.log("get", value);
  },
  value => {
    console.log("set", value);
  }
);

```

## map, filter, reduce 各自有什么作用？

map 遍历数组，并返回一个新数组

```
arr.map((item,index,arr)=>{
    <!-- doing -->
    return data
})
```

filter 筛选数组，返回值为 true 的数组加入新数组，然后返回该数组

```
arr.filter((item,index,arr)=>{
    return index%2===0
})
```

reduce 将数组中的元素通过回掉函数最终处理成一个值

```
<!-- 数组求和实现 -->
var arr =[1,2,3,4,2,3,1]
arr.reduce((acc,current,index,arr)=>{
    console.log(acc,current,index,arr)
    return acc+current
},0)
```
