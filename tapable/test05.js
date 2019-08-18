let {AsyncSeriesHook} = require('tapable')

// 注册方法，分为tap注册，tapAsync 异步注册 cb 还有tapPromise注册的是promise
class Lesson {
  constructor () {
    this.hooks = {
      arch: new AsyncSeriesHook(['name'])
    }
  }
  tap () {
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
  start () {
    // 所有的cb都调用完成才会执行这个最后的回调
    this.hooks.arch.promise('张三').then(() => {
      console.log('学习完成')
    })
  }
}

let l = new Lesson();
l.tap();
l.start();
