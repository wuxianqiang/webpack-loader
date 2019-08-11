class FileListPlugin {
  constructor ({filename}) {
    this.filename = filename;
  }
  apply (compiler) {
    compiler.hooks.emit.tap('FileListPlugin', (complication) => {
      let assets = complication.assets;
      let content = `文件名 资源大小\r\n`;
      Object.entries(assets).forEach(([filename, statObj]) => {
        content += `-${filename} ${statObj.size()}\r\n`
      })
      // 添加了资源对象，文件就会被打包出来
      assets[this.filename] = {
        source () {
          return content
        },
        size () {
          return content.length;
        }
      }
    })
  }
}

module.exports = FileListPlugin;
