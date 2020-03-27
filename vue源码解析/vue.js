let depList = [];
function defineReactive(obj, key, val) {
  /* 一个Dep类对象 */
  const dep = new Dep();
  depList.push(dep);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      /* 将Dep.target（即当前的Watcher对象存入dep的subs中） */
      dep.addSub(Dep.target);
      return val;
    },
    set: function reactiveSetter(newVal) {
      if (newVal === val) return;
      /* 在set的时候触发dep的notify来通知所有的Watcher对象更新视图 */
      dep.notify();
    }
  });
}
function observer(value) {
  if (!value || typeof value !== "object") {
    return;
  }

  Object.keys(value).forEach(key => {
    defineReactive(value, key, value[key]);
  });
}
class Vue {
  constructor(options) {
    this._data = options.data;
    observer(this._data);
    /* 新建一个Watcher观察者对象，这时候Dep.target会指向这个Watcher对象 */
    new Watcher();

    /* 在这里模拟render的过程，为了触发test属性的get函数 */
    console.log("render~", this._data.test);
  }
}
class Watcher {
  constructor() {
    /* 在new一个Watcher对象时将该对象赋值给Dep.target，在get中会用到 */
    Dep.target = this;
  }

  /* 更新视图的方法 */
  update() {
    console.log("视图更新啦～");
  }
}

class Dep {
  constructor() {
    /* 用来存放Watcher对象的数组 */
    this.subs = [];
  }

  /* 在subs中添加一个Watcher对象 */
  addSub(sub) {
    console.log(sub)
    this.subs.push(sub);
  }

  /* 通知所有Watcher对象更新视图 */
  notify() {
    this.subs.forEach(sub => {
      sub.update();
    });
  }
}
Dep.target = null;

// var data = { test: "11" };
// let vm1 = new Vue({ data: data });
// let vm2 = new Vue({ data: data });
// vm1._data.test
// console.log(depList)
// vm1._data.test = 33;
export default Vue
