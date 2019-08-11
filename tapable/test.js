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
      console.log('node')
    });
    this.hooks.arch.tap('react', function (name) {
      console.log('react')
    });
  }
  start () {
    this.hooks.arch.call('张三')
  }
}

let l = new Lesson();
l.tap();
l.start();
