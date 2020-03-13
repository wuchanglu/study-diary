## 1.原始类型有哪几种？null 是对象嘛？

原始类型：boolean,string,number,undefined,null,symbol,bigInt  
null 不是对象,null 的 typeOf 结果是 object，这是一个历史遗留问题，000 开头是的数据类型是对象类型，然后 null 全是 0

## 2.对象类型和原始类型的不同之处？函数参数是对象会发生什么问题？

对象类型存储的是指针，指针指向数据存储的位置 原始类型存储的是数据  
函数参数是对象的话，因为只是拷贝了一个指针过去，所以修改参数的属性的话也会修改到原数据

## 3.typeof 是否能正确判断类型？instanceof 能正确判断对象的原理是什么？

typeof 能够真确判断非 null 的原始类型数据和 function，但是 object，array，date 这些数据都是返回 object  
instanceof 通过原型链查找该实例的原型链上的构造函数是否有该构造函数 使用方式 obj instanceof Preson  
获取数据类型的方法

```
function getDataType(data){
    return Object.prototype.toString.call(data).slice(8,-1)
}
```

## 4.如何正确判断 this？箭头函数的 this 是什么？

普通函数的 this 指向 window，对象属性的话谁调用指向谁，箭头函数的 this 指向定义的时候包裹它的第一个函数的 this  
bind call apply 可以显式的绑定 this，但是对箭头函数无效。call apply 都是直接执行函数，不同点是实参的传递，bind 是返回一个绑定好 this 的函数。多次绑定 this 只有第一次有效  
new 的话比较特殊，new 的时候会先创建一个空对象作为 this，然后在没有特殊 return 其它对象类型数据的时候将 this 作为新的实例返回。

## 5.== 和 === 有什么区别？

==如果两边数据类型不一致的情况下会先进行数据类型转换再做比较  
===必须两边数据类型和值完全相等才是 true

## 6.[]==![]

```
[]==![]
[]==false
[]==0
""==0
0==0
```

## 7.什么是闭包

函数 A 里面包含函数 B，函数 B 使用了函数 A 中的变量，那么函数 B 就是闭包  
闭包缺点：占用了内存，在不需要的时候得释放内存，否则内存将一直占用

### 循环中使用闭包解决 `var` 定义函数的问题

```
for (var i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i)
  }, i * 1000)
}
```

答案：

```
// 闭包
for (var i = 1; i <= 5; i++) {
  (function(j){
      setTimeout(function timer() {
            console.log(j)
        }, j * 1000)
  })(i)
}
//setTimeout的第三个参数
for (var i = 1; i <= 5; i++) {
    setTimeout(function timer(j) {
        console.log(j)
    }, i * 1000,i)
}
// es6
for (let i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i)
  }, i * 1000)
}
```

## 什么是浅拷贝？如何实现浅拷贝？什么是深拷贝？如何实现深拷贝？

浅拷贝只拷贝对象的第一层属性，如果属性值是对象的话还是拷贝地址  
浅拷贝的话 Object.assing() es6 的展开运算符  
深拷贝是将对象的属性完全拷贝出来，无论属性层级多深

### 实现方式：

JSON 转两次，缺点：无法拷贝 function，undefined，symbol，不能解决循环引用对象  
MessageChannel 也可以实现  
或者递归遍历属性进行处理

## 如何理解原型？如何理解原型链？

原型也是一个对象，并且这个对象中包含了很多函数，所以我们可以得出一个结论：对于 obj 来说，可以通过 **proto** 找到一个原型对象，在该对象中定义了很多函数让我们来使用。  
假设 Father ,Son son(实例)

```
son.__proto__===Son.prototype
son.__proto__.constructor===Son
son.__proto__.__proto__===Father.prototype
```

日常访问 son 的某个属性的时候，会现在当前实例身上找，如果没有就一层层往上遍历它的原型链进行查找
