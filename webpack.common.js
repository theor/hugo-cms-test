const webpack = require("webpack");
const path = require("path");
const AssetsPlugin = require("assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    main: path.join(__dirname, "src", "index.js"),
    cms: path.join(__dirname, "src", "js", "cms.js"),
  },

  output: {
    path: path.join(__dirname, "dist")
  },

  module: {
    rules: [
      {
        test: /\.((png)|(svg)|(gif)|(eot)|(woff)|(woff2)|(ttf))(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader?name=/[hash].[ext]"
      },
      // {
      //   test: /\.((eot)|(woff)|(woff2)|(ttf))(\?v=\d+\.\d+\.\d+)?$/,
      //   loader: "file-loader?name=/webfonts/[name].[ext]"
      // },
      
      {
        loader: "babel-loader",
        test: /\.js?$/,
        exclude: /node_modules/,
        query: {cacheDirectory: true}
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          // MiniCssExtractPlugin.loader,
          "css-loader",
          // "postcss-loader",
          "sass-loader"]
      }
    ]
  },

  plugins: [
    new AssetsPlugin({
      filename: "webpack.json",
      path: path.join(process.cwd(), "site/data"),
      prettyPrint: true
    }),
    // new CopyWebpackPlugin([
    //   {
    //     from: "./src/fonts/",
    //     to: "fonts/",
    //     flatten: true
    //   }
    // ]),
    new HtmlWebpackPlugin({
      filename: 'admin/index.html',
      template: 'src/cms.html',
      inject: false,
    }),
  ]
};
