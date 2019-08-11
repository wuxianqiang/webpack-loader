function loader(source) {
  console.log('css')
  let reg = /url\((.+?)\)/g;
  let pos = 0;
  let current;
  let arr = ['let list = []'];
  while (current = reg.exec(source)) {
    let [matched, g] = current;
    let last = reg.lastIndex - matched.length;
    // JSON是为了转换换行
    arr.push(`list.push(${JSON.stringify(source.slice(pos, last))})`);
    pos = reg.lastIndex;

    // "url('./avatar.png')" => 'url(' + require('./avatar.png') + ')'
    arr.push(`list.push('url('+require(${g})+')')`);
  }
  // 最后拼成结尾部分
  arr.push(`list.push(${JSON.stringify(source.slice(pos))})`);
  // 最后是导出
  arr.push(`module.exports=list.join('')`);
  // JS可以执行这段脚本
  return arr.join('\r\n');
}

module.exports = loader

// background: url('./avatar.png');
