module.exports = {
  entry: "./chapter-4/main",
  output: {
    filename: "./chapter-4/app.js"
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