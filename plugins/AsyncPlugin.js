class AsyncPlugin {
  apply(compiler) {
    // 写异步插件的两个方式
    compiler.hooks.emit.tapAsync('AsyncPlugin', (compilation, cb) => {
      setTimeout(() => {
        console.log('异步插件');
        cb();
      }, 1000);
    })
    // 写异步插件可以用回调和promise
    compiler.hooks.emit.tapPromise('AsyncPlugin', (compilation) => {
      return new Promise(function (resolve, reject) {
        setTimeout(() => {
          console.log('异步插件');
          resolve()
        }, 1000);
      })
    })
  }
}

module.exports = AsyncPlugin;
