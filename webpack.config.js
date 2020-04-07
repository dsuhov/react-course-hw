const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: './src/app.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist')
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js|ts)?$/,
        loader: "babel-loader",
        exclude: /node_modules/
      }
    ]
  },
  /*
  * If multiple files share the same name but have different extensions, 
  * webpack will resolve the one with the extension listed first 
  * in the array and skip the rest.
  */
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"]
  },
  devServer: {
    // When using the HTML5 History API, the index.html page will likely have to be served in place of any 404 responses.
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      minify: false
    }),
  ]
}