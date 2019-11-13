const path = require('path');  // 引入路径模块包
const HtmlWepackPlugin = require('html-webpack-plugin');  // 配置 html模板

module.exports = {
  entry: './src/index.js',         // 入口文件
  output: {                        // 出口文件
    // 添加 hash 可以防止文件缓存，每次都会生成4位的 hash 串
    filename: 'bundle.[hash:4].js',         // 打包后的文件名称
    path: path.resolve('dist')     // 打包后的目录，必须是绝对路径         
  },       
  module: {},                      // 处理对应的模块
  plugins: [                       // 开发服务器配置 
    // 通过 new 一下这个类来使用插件
    new HtmlWepackPlugin({
      // 用哪个 html 来作为模板
      // 在 src目录下创建一个 index.html 页面当做模板来用
      template: './src/index.html',
      hash: true  // 会在打包好的 bundle.js 后面加上 hash 串
    })
  ],       
  devServer: {},     // 开发服务器配置
  mode: 'development' // 模式配置
}