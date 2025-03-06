const path = require("node:path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
import { HotModuleReplacementPlugin } from "webpack";

module.exports = {
    mode: "development",
    devtool: "inline-source-map",
    entry: [
        "webpack-hot-middleware/client",
        path.resolve(__dirname, "src/index.ts")
    ],
    output: {
        publicPath: "/",
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
      plugins: [new TsconfigPathsPlugin()],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: "ts-loader",
          options: { configFile: path.resolve(__dirname, "tsconfig.build.json") },
        },
      ],
    },
    plugins: [
        new HotModuleReplacementPlugin()
    ]
}