const path = require("node:path");

module.exports = {
    entry: path.resolve(__dirname, "src/index.ts"),
    mode: "development",
    devtool: "inline-source-map",
    output: {
        publicPath: "/",
        filename: "bundle.js",
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
            /* resolves any package's source code within <root>/packages directory */
            "@my-repo/*": path.resolve(__dirname, "../../packages/*/src/index.ts")
        }
    },
    devServer: {
        port: 4000,
        hot: true,
    },
}