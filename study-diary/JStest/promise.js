let x = 1;
function f1() {
  setTimeout(() => {
    x++;
    console.log(12);
  }, 1000);
}
function f2() {
  setTimeout(() => {
    if (x > 1) {
      x++;
      console.log(34);
    }
  }, 200);
}
function f3() {
  console.log(x);
  if (x > 2) {
    x++;
    console.log(56);
  }
}
// Promise.resolve(1)
//   .then(res => {
//     console.log(1);
//     return f1();
//   })
//   .then(res => {
//     console.log(2);
//     return f2();
//   })
//   .then(res => {
//     console.log(3);
//     return f3();
//   });
let p = new Promise((resolve, reject) => {
  console.log(resolve);
  //   setTimeout(resolve, 1000, "success");
  setTimeout(() => {
    resolve("1");
  }, 1500);
});
p.then(res => {
  console.log("11", res);
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 1200, "2");
  });
})
  .then(res => {
    console.log("11", res);
    return new Promise((resolve, reject) => {
      setTimeout(resolve, 1000, "3");
    });
  })
  .then(res => console.log(res,152));
function promise(fn) {
  return new Promise((resolve, reject) => {
    console.log(1);
    //   setTimeout(resolve, 1000, "success");
    setTimeout(() => {
        fn()
      resolve("1");
    }, 1500);
  });
}
async function test() {
  await promise(()=>{console.log("go");});
  console.log(222);
}
test()
