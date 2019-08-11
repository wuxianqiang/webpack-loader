const path = require('path');
const DonePlugin = require('./plugins/DonePlugin')
const AsyncPlugin = require('./plugins/AsyncPlugin')

module.exports = {
  mode: 'development',
  entry: './src/a.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  plugins: [
    new DonePlugin(),
    new AsyncPlugin()
  ]
}
