## 并发与并行的区别？

并发指得是在一段时间内做了两件或多件事情（宏观的）  
并行是假设你的 cpu 是双核，那么它就可以并行做两件事情（微观的）

## 什么是回调函数？回调函数有什么缺点？如何解决回调地狱问题？

往函数 fn 执行的时候往里面传一个函数并执行，那这个就是回调函数。经典场景 ajax((res)=>{})  
回调函数很容易引起回调地狱，使得代码的维护变得非常困难（改代码的时候一牵一发而动全身，代码阅读和编写更困难）

```
<!-- 三个网络请求，请求1返回结果后再发起请求2，请求2返回结果后再发起请求3 -->
ajax(url1,res1=>{
    ajax(url2,res2=>{
        ajax(url3,res3=>{})
    })
})
```

可以使用 Promise 或者 async await

```
<!-- promise -->
new Promise((resolve,reject)=>{
    return ajax(url1)
}).then(res=>{
    return ajax(url2)
}).then(res=>{
    return ajax(url3)
}).then(res=>{
    <!-- doing -->
})
<!-- async await -->
async function request(){
    const res1= await ajax(url1)
    const res2= await ajax(url2)
    const res3= await ajax(url3)
    <!-- doing -->
}
```

## 你理解的 Generator 是什么？

Generator 可以让我们控制函数内部代码执行，使其能够执行完一部分后停下并等待我们主动去执行的

## Promise 的特点是什么，分别有什么优缺点？什么是 Promise 链？Promise 构造函数执行和 then 函数执行有什么区别？

Promise 有三个状态，分别为 pedding、resolved、rejected，一旦状态从等待变成结束（resolved,rejected）就不可以再改变  
优点：异步请求能实现链式调用，解决回调地狱  
缺点：无法取消 promise，错误需要通过回调函数捕获

## async 及 await 的特点，它们的优点和缺点分别是什么？await 原理是什么？

一个函数加上 async 的话就会返回一个 promise，async 就是将函数返回值使用 Promise.resolve()包了一下，并且 await 只能和 async 搭配使用  
async 和 await 算是异步的最终解决方案了，毕竟 promise 的 then 写多了也挺恶心的  
缺点：因为 await 将异步代码改成了同步代码，如果多个异步代码相互直接没有依赖性却使用了 await 会导致性能上的降低  
await其实就是generator加上Promise的语法糖，且内部实现了自动执行generator  
## setTimeout、setInterval、requestAnimationFrame 各有什么特点？
setTimeout延时执行，setInterval间隔多少时间执行一次，因为js是单线程的，所以setTimeout和setInterval都是不精准的  
requestAnimationFrame，在浏览器下次重绘之前调用指定的函数。通常一秒重绘60次，也就是大概16.6ms，并且在浏览器页面处于后台中的时候通常是不会执行的，这样也提升了性能。（延时效果是精准的，没有其它定时器不准确的问题，可以拿来实现setTimeout和interval）