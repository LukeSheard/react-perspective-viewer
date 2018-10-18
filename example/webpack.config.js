const path = require("path");

module.exports = {
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      }
    ]
  },
  resolve: {
    alias: {
      "@jpmorganchase/react-perspective-viewer": path.join(__dirname, "..", "src")
    },
    extensions: [
      ".tsx",
      ".ts",
      ".js",
      ".json"
    ]
  }
}