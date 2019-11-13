const path = require('path');  // 引入路径模块包
const HtmlWepackPlugin = require('html-webpack-plugin');  // 配置 html模板
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin'); // 拆分css样式插件
const {CleanWebpackPlugin} = require('clean-webpack-plugin');  // 清除打包之前的文件
const Webpack = require('webpack');  // 引入 webpack 包
// 正常引入de less
const styleLess = new ExtractTextWebpackPlugin('css/style.css');
const resetCss = new ExtractTextWebpackPlugin('css/reset.css');
const mixLess = new ExtractTextWebpackPlugin('css/mix.css');

module.exports = {
  entry: './src/index.js',         // 入口文件
  output: {                        // 出口文件
    // 添加 hash 可以防止文件缓存，每次都会生成4位的 hash 串
    filename: 'bundle.[hash:4].js',         // 打包后的文件名称
    path: path.resolve('dist')     // 打包后的目录，必须是绝对路径         
  },       
  module: {                        // 处理对应的模块 
    rules: [
      {
        test: /\.css$/,            //解析css
        //use: ['style-loader', 'css-loader']  // 从右向左解析
        use: styleLess.extract({
          // 将 css 用link的方式引入就不需要用 style-loader了
          use: 'css-loader',
          publicPath: '../'
        })
      },
      {  // 解析less
        test: /\.less$/,
        use: resetCss.extract({
          use: ['css-loader', 'less-loader']
        })
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,  // 小于8k的图片自动转成base64格式，并且不会存在实体图片
              outputPath: 'images/' // 图片打包后存放的目录
            }
          }
        ]
      },
      {
        test: /\.(htm| html)$/,
        use: 'html-withimg-loader'
      },
      {
        test: /\.(eot|ttf|woff|svg)$/,
        use: 'file-loader'
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: /src/,  // 只转化src目录下的js
        exclude: /node_modules/  // 排除掉 node_modules, 优化打包速度
      }
    ]
  },                      
  plugins: [                       // 开发服务器配置 
    // 通过 new 一下这个类来使用插件
    new HtmlWepackPlugin({
      // 用哪个 html 来作为模板
      // 在 src目录下创建一个 index.html 页面当做模板来用
      template: './src/index.html',
      hash: true  // 会在打包好的 bundle.js 后面加上 hash 串
    }),
    //拆分后会把 css 文件放到 dist 目录下的 css/style.css
    styleLess,
    resetCss,
    mixLess,
    new CleanWebpackPlugin(),
    new Webpack.HotModuleReplacementPlugin()  // 热更新，不是刷新
  ],       
  devServer: {          // 开发服务器配置
    contentBase: './dist',
    host: 'localhost',  // 默认是 localhost
    port: 3000,         // 端口
    open: false,        // 默认不自动打开浏览器 
    hot: true           // 开启热更新
  },    
  mode: 'development', // 模式配置
  resolve: {
    alias: {  //别名

    },
    extensions: ['.js', '.json', '.css']
  },
  optimization: {  // 提取公共代码
    splitChunks: {
      cacheGroups: {
        vendor: { // 抽离第三方插件
           test: /node_modules/, //指定是 node_modules 下的第三方包 
           chunks: 'initial',
           name: 'vendor',  // 打包后的文件名， 任意命名
           priority: 10 // 设置优先级，防止和自定义的公共代码提取时被覆盖， 不进行打包
        },
        utils: {
          chunks: 'initial',
          name: 'utils', // 任意命名
          minSize: 0     // 只要超出0字节就生成新包
        }
      }
    }
  }
}