const path = require("node:path");
const WebpackAssetsManifest = require("webpack-assets-manifest");
const { merge } = require("webpack-merge");
const { clientRootPath, baseConfig } = require("./base.cjs");

module.exports = merge( baseConfig, {
    entry: path.join(clientRootPath, "src/browser-entry.tsx"),
    mode: "development",
    devtool: "inline-source-map",
    output: {
        publicPath: "/",
        filename: "[name].js",
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
                        [
                            "@babel/preset-react",
                            { runtime: "automatic" }, // let React be automatically imported
                        ],
                    ],
                },
            },
        ],
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "all",
                },
            },
        },
    },
    plugins: [new WebpackAssetsManifest({ entrypoints: true })],
    devServer: {
        port: 4000,
        hot: true,
    },
});
