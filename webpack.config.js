const path = require('path');  // 引入路径模块包

module.exports = {
  entry: './src/index.js',         // 入口文件
  output: {                        // 出口文件
    filename: 'bundle.js',         // 打包后的文件名称
    path: path.resolve('dist')     // 打包后的目录，必须是绝对路径         
  },       
  module: {},        // 处理对应的模块
  plugins: [],       // 开发服务器配置
  devServer: {},     // 开发服务器配置
  mode: 'development' // 模式配置
}