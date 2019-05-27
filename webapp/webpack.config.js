const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});

module.exports = env => ({
  entry: "./src/index.js",
  output: {
    path: path.resolve("dist"),
    filename: "bundled.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "output"),
    compress: true,
    port: 9000,
    historyApiFallback: true,
    publicPath: "/"
  },
  resolve: {
    modules: [path.resolve("./src"), path.resolve("./node_modules")]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      },
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }]
      }
    ]
  },
  plugins: [htmlPlugin]
});
