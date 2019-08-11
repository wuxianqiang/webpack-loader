
// 同步的钩子
class SyncHook {
  constructor (args) {
    // args是标识作用的
    this.tasks = [];
  }
  call (...args) {
    this.tasks.forEach(task => task(...args))
  }
  tap (name, task) {
    // name是标识作用的
    this.tasks.push(task)
  }
}

let hook = new SyncHook(['name']);
hook.tap('react', (name) => {
  console.log('react', name)
})
hook.call('张三')
