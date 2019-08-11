// 吧外链的标签 变成内联

class InlineSourcePlugin {
  constructor({ match }) {
    this.match = match;
  }
  processTags(data, compilation) {
    // 处理标签的数据
    let headTags = [];
    let bodyTags = [];
    data.headTags.forEach(headTag => {
      headTags.push(this.processTag(headTag, compilation))
    })
    data.bodyTags.forEach(bodyTag => {
      bodyTags.push(this.processTag(bodyTag, compilation))
    })
    return { ...data, headTags, bodyTags }
  }
  processTag(tag, compilation) {
    // 处理某个标签
    let newTag;
    let url;
    if (tag.tagName === 'link' && this.match.test(tag.attributes.href)) {
      newTag = {
        tagName: 'style',
        attributes: { type: 'text/css' }
      }
      url = tag.attributes.href
    }
    if (tag.tagName === 'script' && this.match.test(tag.attributes.src)) {
      newTag = {
        tagName: 'script',
        attributes: { type: 'application/javascript' }
      }
      url = tag.attributes.src
    }
    if (url) {
      // 将内容放到标签里面
      newTag.innerHTML = compilation.assets[url].source();
      // 删除源有的插件
      delete compilation.assets[url];
      return newTag;
    }
    return tag;
  }
  apply(compiler) {
    // html-webpack-plugin 打包出来的HTML
    compiler.hooks.compilation.tap('InlineSourcePlugin', (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync('alterPlugin', (data, cb) => {
        data = this.processTags(data, compilation)
        cb(null, data)
      })
    })
  }
}
