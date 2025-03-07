const path = require("node:path");
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const WebpackAssetsManifest = require("webpack-assets-manifest");

module.exports = (env = {}) => {
    const plugins = [
        new WebpackAssetsManifest({ entrypoints: true }),
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
        entry: path.resolve(__dirname, "src/index.ts"),
        mode: "production",
        devtool: "source-map",
        output: {
            path: process.env.STATIC_ASSETS_PATH ?? path.resolve(__dirname, "dist"),
            filename: "[name].[contenthash].js",
            hashDigestLength: 8,
            clean: true
        },
        optimization: {
            minimize: false // TODO: remove once ready for production
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
                    plugins: [
                      "lodash"
                    ],
                  },
            },
          ],
        },
        plugins
    }
}