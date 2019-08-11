let Minimize = require('minimize')
let loaderUtils = require('loader-utils');
let fs = require('fs')

// loader主要功能是转换
function loader(source) {
  let cb = this.async();
  let {layout, reg} = loaderUtils.getOptions(this);
  // require的模板会被缓存起来
  // 但是我们不要缓存要重新打包
  this.addDependency(layout) // 将文件添加到依赖中，修改之后可以重新打包
  fs.readFile(layout, 'utf8', function (err, data) {
    let r = data.replace(reg, source);
    // 必须返回一个可以执行的脚本，里面是require使用的
    r = `module.exports = ${JSON.stringify(r)}`
    cb(err, r)
  })
}

module.exports = loader;
