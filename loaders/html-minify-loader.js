let Minimize = require('minimize')
let loaderUtils = require('loader-utils');
// 验证属性就是要使用这个包
let validateOptions = require('schema-utils')

// loader主要功能是转换
function loader(source) {
  let options = loaderUtils.getOptions(this);
  // 先定义参数的类型
  let schema = {
    type: 'object',
    properties: {
      comments: {
        type: 'boolean'
      }
    }
  }
  validateOptions(schema, options, 'html-minify-loader')

  let minimize = new Minimize();
  let r = minimize.parse(source)
  return `module.exports = ${JSON.stringify(r)}`;

}

module.exports = loader;
