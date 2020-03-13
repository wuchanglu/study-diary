const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
  mode: "development", // 模式，表示dev环境
  entry: {
    //实现刷新浏览器webpack-hot-middleware/client?noInfo=true&reload=true 是必填的
    main: [
      "webpack-hot-middleware/client?noInfo=true&reload=true",
      "./src/index.js"
    ]
  }, // 入口文件
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{ loader: "babel-loader" }]
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 2
            }
          },
          "less-loader",
          "postcss-loader"
        ]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"]
      },
      {
        test: /\.(png|jpg|gif|jpeg|svg)$/,
        use: {
          loader: "url-loader",
          options: {
            name: "[name]_[hash].[ext]", // placeholder 占位符
            outputPath: "images/", // 打包文件名
            limit: 102800 // 小于200kb则打包到js文件里，大于则使用file-loader的打包方式打包到imgages里
          }
        }
      },
      {
        test: /\.(eot|woff2?|ttf|svg)$/,
        use: {
          loader: "url-loader",
          options: {
            name: "[name]-[hash:5].min.[ext]", // 和上面同理
            outputPath: "fonts/",
            limit: 5000
          }
        }
      }
    ]
  }, // 让 webpack 能够去处理那些非 JavaScript 文件
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html"
    }),
    new CleanWebpackPlugin(),
    new webpack.NamedModulesPlugin(), //用于启动HMR时可以显示模块的相对路径
    new webpack.HotModuleReplacementPlugin() // 开启模块热更新，热加载和模块热更新不同，热加载是整个页面刷新
  ], // 插件
  output: {
    filename: "bundle.js", // 打包后文件名称
    path: path.resolve(__dirname, "../dist"), // 打包后文件夹存放路径
    publicPath: "/"
  },
  devServer: {
    contentBase: path.join(__dirname, "../dist")
  }
};
