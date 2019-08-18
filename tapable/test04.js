// 异步串行
// 异步并行
// 异步有promise和回调


let { AsyncSeriesHook } = require('tapable')

// 注册方法，分为tap注册，tapAsync 异步注册 cb 还有tapPromise注册的是promise
class Lesson {
  constructor() {
    this.hooks = {
      arch: new AsyncSeriesHook(['name'])
    }
  }
  tap() {
    this.hooks.arch.tapAsync('node', function (name, cb) {
      setTimeout(() => {
        console.log(`${name}学习node课程`)
        cb()
      }, 1000);
    });
    this.hooks.arch.tapAsync('react', function (name, cb) {
      setTimeout(() => {
        console.log(`${name}学习react课程`)
        cb()
      }, 1000);
    })
  }
  start() {
    // 所有的cb都调用完成才会执行这个最后的回调
    this.hooks.arch.callAsync('张三', () => {
      console.log('学习完成')
    })
  }
}

let l = new Lesson();
l.tap();
l.start();
