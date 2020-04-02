const path = require('path');

module.exports = {
  entry: './src/app.ts',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, './dist')
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
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
}