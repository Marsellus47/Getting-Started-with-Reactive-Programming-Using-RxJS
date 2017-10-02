module.exports = {
  entry: "./chapter-3/main",
  output: {
    filename: "./chapter-3/app.js"
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