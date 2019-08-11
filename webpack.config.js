const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'source-map',
  resolveLoader: {
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, 'loaders')
    ]
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: {
          loader: 'html-minify-loader',
          options: { // 属性校验
            comments: true
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html', // 会调用require('./index.html')
      filename: 'index.html'
    })
  ]
}
