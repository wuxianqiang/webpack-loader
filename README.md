# 65、66 babel-loader;

loader有两部分
```
function loader (source) {
  return source;
}

loader.pitch = function () {
  console.log('pitch')
}

module.exports = loader;
```
会先执行loader的pitch方法，再执行loader方法
pitch是正向的，loader是反向的
pitch如果有返回结果，会终止后续执行


1· file-loader 拷贝文件
```js
import url from './1.png'
let img = document.createElement('img');
img.src = url;
document.appendChild(img)
```
2. url-loader 主要是转换base64的
