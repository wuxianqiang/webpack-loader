// 事件流程

let {SyncHook} = require('tapable');

class Lesson {
  constructor () {
    this.hooks = {
      arch: new SyncHook(['name'])
    }
  }
  tap () {
    this.hooks.arch.tap('node', function (name) {
      console.log(`${name}学习node课程`)
    });
    this.hooks.arch.tap('react', function (name) {
      console.log(`${name}学习react课程`)
    });
  }
  start () {
    this.hooks.arch.call('张三')
  }
}

let lesson = new Lesson();
lesson.tap();
lesson.start();
console.log('学习完成')
