let loaderUtils = require('loader-utils');

// minicss-exract-plugin
function loader(source) {
  // source是文件的内容
  let name = loaderUtils.interpolateName(this, '[hash:8].[ext]', {content: source});
  this.emitFile(name, source); // 抽离一个文件
  return `module.exports = ${JSON.stringify(name)}`;
}
loader.raw = true; // 二进制文件
module.exports = loader;
