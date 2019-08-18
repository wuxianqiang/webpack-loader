
// 同步的钩子
class AsyncSeriesHook {
  constructor(args) {
    // args是标识作用的
    this.tasks = [];
  }
  promise(...args) {
    // redux源码
    let [first, ...others] = this.tasks;
    return others.reduce((p, n) => {
      return p.then(() => n(...args))
    }, first(...args))
  }
  tapPromise(name, task) {
    // name是标识作用的
    this.tasks.push(task)
  }
}

class Lesson {
  constructor() {
    this.hooks = {
      arch: new AsyncSeriesHook(['name'])
    }
  }
  tap() {
    this.hooks.arch.tapPromise('node', function (name, cb) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(`${name}学习node课程`)
          resolve()
        }, 1000);
      })
    });
    this.hooks.arch.tapPromise('react', function (name, cb) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(`${name}学习react课程`)
          resolve()
        }, 1000);
      })
    });
  }
  start() {
    // 所有的cb都调用完成才会执行这个最后的回调
    this.hooks.arch.promise('张三').then(() => {
      console.log('学习完成')
    })
  }
}

let l = new Lesson();
l.tap();
l.start();
