const path = require('path');

module.exports = {
  entry: './src/scripts/main.js',
  output: {
    path: path.resolve(__dirname, './dist/scripts'),
    publicPath: './dist/scripts',
    filename: 'main.js'
  },  
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }, {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.common.js'
    }
  },
  // performance: {
  //   hints: false
  // },
  // devtool: '#eval-source-map'
};