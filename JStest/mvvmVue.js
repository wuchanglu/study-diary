function observe(obj) {
  if (!obj || typeof obj !== "object") {
    return;
  }
  Object.keys(obj).forEach(key => {
    defineReactive(obj, key, obj[key]);
  });
}
function defineReactive(obj, key, val) {
  observe(val);
  console.log(Watcher);
  let dp = new Dep();
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      if (Dep.target) {
        dp.addSub(Dep.target);
      }
      return val;
    },
    set: function reactiveSetter(newVal) {
      val = newVal;
      if (typeof newVal === "object") {
        observe(newVal);
      }
      // 执行 watcher 的 update 方法
      dp.notify();
    }
  });
}
// 通过 Dep 解耦属性的依赖和更新操作
class Dep {
  constructor() {
    this.subs = [];
  }
  // 添加依赖
  addSub(sub) {
    this.subs.push(sub);
  }
  // 更新
  notify() {
    this.subs.forEach(sub => {
      sub.update();
    });
  }
}
// 全局属性，通过该属性配置 Watcher
Dep.target = null;
class Watcher {
  constructor(obj, key, cb) {
    Dep.target = this;
    this.cb = cb;
    this.obj = obj;
    this.key = key;
    this.value = obj[key];
    Dep.target = null;
  }
  update() {
    this.value = this.obj[this.key];
    this.cb(this.value);
  }
}

var data = { name: "boby" };
observe(data);
function update(value) {
  console.log(`${value}触发了更新`);
}
// 模拟解析到 `{{name}}` 触发的操作
new Watcher(data, "name", update);
data.name = "alice";
