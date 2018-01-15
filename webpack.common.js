const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './src/scripts/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './dist/scripts'),
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }, {
        enforce: 'pre',
        test: /\.js$/,
        exclude: '/node_modules/',
        loader: 'eslint-loader'
      }, {
        test: /\.js$/,
        exclude: '/node_modules/',
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['./dist/scripts'])
  ],
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.common.js'
    }
  }
};