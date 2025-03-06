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
    watch: !!env.watch,
    entry: path.resolve(__dirname, "src/index.tsx"),
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
      extensions: [".js", ".ts", ".tsx"],
      plugins: [new TsconfigPathsPlugin()]
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
    plugins,
    devtool: "source-map",
  };
};