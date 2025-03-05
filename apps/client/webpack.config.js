const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const WebpackAssetsManifest = require("webpack-assets-manifest");
const TerserPlugin = require("terser-webpack-plugin");
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const path = require("node:path");

module.exports = (env = {}) => {
  const plugins = [
    new WebpackAssetsManifest({ publicPath: true, entrypoints: true })
  ];

  if (env.analyze) {
    plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: true
      })
    );
  }

  return {
    entry: "./src/index.ts",
    mode: "production",
    optimization: {
      minimizer: [new TerserPlugin()]
    },
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
    plugins,
  };
};