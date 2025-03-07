const path = require("node:path");

module.exports = {
    entry: path.resolve(__dirname, "src/index.ts"),
    mode: "development",
    output: {
        filename: "bundle.development.js",
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: "babel-loader",
              options: {
                presets: [
                  "@babel/preset-typescript",
                ],
              },
        },
      ],
    },
    resolve: {
        alias: {
            "@my-repo/*": path.resolve(__dirname, "../*/src/index.js")
        }
    }
}