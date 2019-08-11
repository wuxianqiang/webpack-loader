
// 同步的钩子
class AsyncParallelHook {
  constructor (args) {
    // args是标识作用的
    this.tasks = [];
  }
  promise(...args) {
    let tasks = this.tasks.map(task => task(...args));
    return Promise.all(tasks)
  }
  tapPromise (name, task) {
    // name是标识作用的
    this.tasks.push(task)
  }
}

let hook = new AsyncParallelHook(['name']);
hook.tapPromise('react', (name) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('react');
      resolve()
    }, 1000);
  })
})
hook.tapPromise('react', (name) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('react');
      resolve()
    }, 1000);
  })
})
hook.promise('张三').then(() => {
  console.log('ok')
})

// 异步并发的钩子
// AsyncParralleBaiHook
