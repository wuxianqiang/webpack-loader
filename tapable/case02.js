
// 同步的钩子
class AsyncParallelHook {
  constructor (args) {
    // args是标识作用的
    this.tasks = [];
  }
  callAsync (...args) {
    let finalCallback = args.pop();
    let index = 0;
    const done = () => {
      index++;
      if (index === this.tasks.length) {
        finalCallback()
      }
    }
    this.tasks.forEach(task => {
      task(...args, done)
    })
  }
  tapAsync (name, task) {
    // name是标识作用的
    this.tasks.push(task)
  }
}

let hook = new AsyncParallelHook(['name']);
hook.tapAsync('react', (name, cb) => {
  setTimeout(() => {
    console.log('react', name);
    cb()
  }, 1000);
})
hook.tapAsync('react', (name, cb) => {
  setTimeout(() => {
    console.log('react', name);
    cb()
  }, 1000);
})
hook.callAsync('张三', () => {
  console.log('ok')
})
