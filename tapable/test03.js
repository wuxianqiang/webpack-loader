// 异步串行
// 异步并行

let {AsyncParallelHook} = require('tapable')

// 注册方法，分为tap注册，tapAsync 异步注册 cb 还有tapPromise注册的是promise
class Lesson {
  constructor () {
    this.hooks = {
      arch: new AsyncParallelHook(['name'])
    }
  }
  tap () {
    this.hooks.arch.tapPromise('node', function (name, cb) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('node');
          resolve()
        }, 1000);
      })
    });
    this.hooks.arch.tapPromise('react', function (name, cb) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('react');
          resolve()
        }, 1000);
      })
    });
  }
  start () {
    // 所有的cb都调用完成才会执行这个最后的回调
    this.hooks.arch.promise('张三').then(() => {
      console.log('ok')
    })
  }
}

let l = new Lesson();
l.tap();
l.start();
