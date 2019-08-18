
// 同步的钩子
class AsyncSeriesHook {
  constructor (args) {
    // args是标识作用的
    this.tasks = [];
  }
  callAsync(...args) {
    // 类似于express的next
    let finalCallback = args.pop()
    let index = 0;
    let next = () => {
      if (this.tasks.length === index) return finalCallback();
      let task = this.tasks[index++];
      task(...args, next)
    }
    next()
  }
  tapAsync (name, task) {
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
