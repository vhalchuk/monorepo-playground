const path = require("node:path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
import { HotModuleReplacementPlugin } from "webpack";

module.exports = {
    mode: "development",
    devtool: "inline-source-map",
    entry: [
        "webpack-hot-middleware/client",
        path.resolve(__dirname, "src/index.tsx")
    ],
    output: {
        publicPath: "/",
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    resolve: {
      extensions: [".js", ".ts", ".tsx"],
      plugins: [new TsconfigPathsPlugin()],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: "babel-loader",
              options: {
                presets: [
                  "@babel/preset-env",
                  "@babel/preset-typescript",
                  [
                    "@babel/preset-react",
                    { runtime: "automatic" } // let React be automatically imported
                  ],
                ],
                plugins: ["lodash"],
              },
        },
      ],
    },
    plugins: [
        new HotModuleReplacementPlugin()
    ]
}