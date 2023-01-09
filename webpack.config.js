const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //将CSS代码提取为独立文件的插件
const NODE_ENV = process.env.NODE_ENV; // 获取环境变量
const isProd = NODE_ENV === "production";
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // 每次构建清除上一次打包出来的文件
const nodeExternals = require("webpack-node-externals");
const plugins = isProd
  ? [new CleanWebpackPlugin(), new MiniCssExtractPlugin()]
  : [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin(),
      new HtmlWebpackPlugin({
        template: "public/index.html",
      }),
    ];

module.exports = {
  mode: isProd ? "production" : "development",
  entry: isProd ? "./src/components/index.js" : "./src/app.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
    libraryTarget: isProd ? "commonjs2" : undefined, // 包需要被module.exports，这就要用到common
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/, //排除node_modules文件夹
        use: [
          {
            loader: MiniCssExtractPlugin.loader, //建议生产环境采用此方式解耦CSS文件与js文件
          },
          {
            loader: "css-loader", //CSS加载器
            options: { importLoaders: 2 }, //指定css-loader处理前最多可以经过的loader个数
          },
          {
            loader: "postcss-loader", //承载autoprefixer功能
          },
          {
            loader: "sass-loader", //SCSS加载器，webpack默认使用node-sass进行编译
          },
        ],
      },
    ],
  },
  devServer: {
    static: "./dist",
  },
  externals: isProd ? [nodeExternals()] : [], // nodeExternals 使得打包的组件中不包括任何 node_modules 里面的第三方组件，起到减小体积的作用。
  plugins,
};
