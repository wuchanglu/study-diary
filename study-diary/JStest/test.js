const times = 1000;
let arr = [];
for (let i = 0; i < 1000000; i++) {
  arr.push({});
}
function getTimeByForOf() {
  const start = new Date().valueOf();
  for (let item of arr) {
    item.name = "xx";
    item.sex = "1";
    item.age = 10;
    item.money = 100;
  }
  const end = new Date().valueOf();
  return end - start;
}
function getTimeByForEach() {
  const start = new Date().valueOf();
  arr.forEach(item => {
    item.name = "xx";
    item.sex = "1";
    item.age = 10;
    item.money = 100;
  });
  const end = new Date().valueOf();
  return end - start;
}
function getTimeByMap() {
  const start = new Date().valueOf();
  arr.map(item => {
    item.name = "xx";
    item.sex = "1";
    item.age = 10;
    item.money = 100;
  });
  const end = new Date().valueOf();
  return end - start;
}
function getTimeByFilter() {
  const start = new Date().valueOf();
  arr.filter(item => {
    item.name = "xx";
    item.sex = "1";
    item.age = 10;
    item.money = 100;
  });
  const end = new Date().valueOf();
  return end - start;
}
function getTimeByFor() {
  const start = new Date().valueOf();
  for (let i = 0; i < arr.length; i++) {
    arr[i].name = "xx";
    arr[i].sex = "1";
    arr[i].age = 10;
    arr[i].money = 100;
  }
  const end = new Date().valueOf();
  return end - start;
}
let forof = 0;
let foreach = 0;
let bymap = 0;
let byfilter = 0;
let byfor = 0;
console.log("start...");
for (let i = 0; i < times; i++) {
  forof += getTimeByForOf();
  foreach += getTimeByForEach();
  bymap += getTimeByMap();
  byfilter += getTimeByFilter();
  byfor += getTimeByFor();
}

console.log("for of", forof / times);
console.log("forEach", foreach / times);
console.log("map", bymap / times);
console.log("filter", byfilter / times);
console.log("for", byfor / times);
console.log("total", forof + foreach + bymap + byfilter + byfor);
