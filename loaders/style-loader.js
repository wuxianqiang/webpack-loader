let loaderUtils = require('loader-utils');
// 最后一个loader必须要导出一个JS脚本可以执行的
function loader(source) {
  console.log('style')
  // let str = `
  // let style = document.createElement('style');
  // style.innerHTML = ${JSON.stringify(source)};
  // document.head.appendChild(style);
  // `
  // return str
  return source
}

// 目的值为了让这个最先执行，而且可以把css-loader里面的导出JS执行了
// style-loader上，写了pitch，
// !!css-loader!less-loader!./index.less
loader.pitch = function (remainingRequest) { // remainingRequest剩余的请求
  // console.log(remainingRequest, 'aa')
  console.log('pitch')
  let str = `
  let style = document.createElement('style');
  style.innerHTML = require(${loaderUtils.stringifyRequest(this, '!!'+remainingRequest)});
  document.head.appendChild(style);
  `
  return str
}

module.exports = loader

// loaderUtils.stringifyRequest把绝对路径转换成相对路径
// require(!!css-loader!less-loader!./index.less) 定义了行内loader处理，忽略其他的loader，比如use里面配置的loader

// less-pitch
// style-pitch
// 跳过所有的loader
// less-loader
// css-loader
// 拿到字符串
// style-loader
