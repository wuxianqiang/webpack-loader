const path = require('path');
const DonePlugin = require('./plugins/DonePlugin')
const AsyncPlugin = require('./plugins/AsyncPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FileListPlugin = require('./plugins/FileListPlugin')

module.exports = {
  mode: 'development',
  entry: './src/a.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html'
    }),
    new FileListPlugin({
      filename: 'list.md'
    })
  ]
}
