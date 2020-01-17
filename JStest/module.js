/**
 * 生成实例时候传入函数和毫米
 * 需要执行的时候直接调用实例的doing，参数以对象形式传递
 */
class Debounce {
  constructor(fn, limit) {
    this.limit = limit || 200;
    this.fn = fn;
    this.timeout = undefined;
  }
  doing(param) {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    return new Promise((resolve, reject) => {
      this.timeout = setTimeout(() => {
        try {
          clearTimeout(this.timeout);
          this.timeout=undefined
          resolve(this.fn(param));
        } catch (error) {
          reject(error);
        }
      }, this.limit);
    });
  }
}
/**
 * 同上
 */
class Throttle {
  constructor(fn, limit) {
    this.limit = limit || 200;
    this.fn = fn;
    this.timeout = undefined;
  }
  doing(param) {
    if (this.timeout) {
      return new Promise(() => {});
    }
    return new Promise((resolve, reject) => {
      this.timeout = setTimeout(() => {
        try {
          clearTimeout(this.timeout);
          this.timeout=undefined
          resolve(this.fn(param));
        } catch (error) {
          reject(error);
        }
      }, this.limit);
    });
  }
}