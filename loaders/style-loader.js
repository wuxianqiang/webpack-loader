
// 最后一个loader必须要导出一个JS脚本可以执行的
function loader(source) {
  let str = `
  let style = document.createElement('style');
  style.innerHTML = ${JSON.stringify(source)};
  document.head.appendChild(style);
  `
  return str
}

module.exports = loader
