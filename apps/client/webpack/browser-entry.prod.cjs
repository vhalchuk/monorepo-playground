const path = require("node:path");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const WebpackAssetsManifest = require("webpack-assets-manifest");
const { merge } = require("webpack-merge");
const { clientRootPath, baseConfig } = require("./base.cjs");

module.exports = (env = {}) => {
    const plugins = [new WebpackAssetsManifest({ entrypoints: true })];

    if (env.analyze) {
        plugins.push(
            new BundleAnalyzerPlugin({
                analyzerMode: "static",
                openAnalyzer: true,
            })
        );
    }

    return merge(baseConfig, {
        entry: path.join(clientRootPath, "src/browser-entry.tsx"),
        mode: "production",
        devtool: "source-map",
        output: {
            path: process.env.BROWSER_OUTPUT_PATH ?? path.resolve(clientRootPath, "dist"),
            filename: "[name].[contenthash].js",
            hashDigestLength: 8,
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    loader: "babel-loader",
                    options: {
                        presets: [
                            [
                                "@babel/preset-env",
                                {
                                    targets: {
                                        browsers: "last 2 versions",
                                    },
                                },
                            ],
                            "@babel/preset-typescript",
                            [
                                "@babel/preset-react",
                                { runtime: "automatic" }, // let React be automatically imported
                            ],
                        ],
                        plugins: ["lodash"],
                    },
                },
            ],
        },
        plugins,
    });
};
