module.exports = {
  entry: "./src/js/main.js",
  output: {
    path: __dirname + "/bundles",
    filename: "app.bundle.js"
  },
  module: {
    loaders: [
      {test: /\.css$/, loader: "style!css"},
      {test: /\.ts$/, loader: 'awesome-typescript-loader'},
      {test: /\.js$/, loader: 'awesome-typescript-loader'} // process ES6 using Typescript tsc
    ]
  }
};
