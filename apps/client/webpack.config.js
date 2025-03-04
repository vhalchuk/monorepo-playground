/* eslint-disable import/no-extraneous-dependencies */
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const WebpackAssetsManifest = require("webpack-assets-manifest");
const path = require("node:path");

module.exports = {
  entry: "./src/index.ts",
  mode: "development",
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    hashDigestLength: 8,
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
        options: { configFile: "tsconfig.build.json" },
      },
    ],
  },
  plugins: [
    new WebpackAssetsManifest({ publicPath: true, entrypoints: true }),
  ]
};