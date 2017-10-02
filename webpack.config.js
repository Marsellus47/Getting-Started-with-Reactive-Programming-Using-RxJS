module.exports = {
  entry: "./chapter-2/main",
  output: {
    filename: "./chapter-2/app.js"
  },
  module: {
    loaders: [
      {
        test: /.ts$/,
        loader: "ts-loader"
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  }
}