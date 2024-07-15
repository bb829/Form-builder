const path = require("path");
module.exports = {
  mode: "development",
  entry: {
    frontend: "./modules/frontend.js",
    backend: "./modules/backend.js",
    main: "./modules/main.js"
  },
  output: {
    path: path.resolve(__dirname, "assets/js"),
    filename: "[name].bundle.js"
  }
}