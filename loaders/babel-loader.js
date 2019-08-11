let loaderUtils = require('loader-utils')
let babel = require('@babel/core')
// 这个包提供一些方法方便我们操作
function loader (source) {
  let cb = this.async(); // 调用此方法loader会变成一般loader
  let options = loaderUtils.getOptions(this);
  babel.transform(source, {
    ...options,
    sourceMap: true,
    filename: this.resourcePath.split('/').pop()
  }, function (err, r) {
    cb(err, r.code, r.map)
  })
  // return source;
}

module.exports = loader

// 怎么调试webpack源码
// 1. 写一个文件require('webpack')
// 2. 在浏览器中调试 node --inspect-brk ./node_modules/webpack/bin/webpack.js
// 浏览器调试 chrome://inspect

// babel-loader
// core.transform
// preset-env

// 异步的loader要调用async
