let loaderUtils = require('loader-utils');
let mime = require('mime');

// minicss-exract-plugin
function loader(source) {
  let {limit} = loaderUtils.getOptions(this);
  if (limit > source.length) {
    // 转成base64
    return `module.exports = "data:${mime.getType(this.resourcePath)};base64,${source.toString('base64')}"`
  } else {
    return require('./file-loader')
  }
}
loader.raw = true;
module.exports = loader;
