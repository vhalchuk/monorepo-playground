const path = require("node:path");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const WebpackAssetsManifest = require("webpack-assets-manifest");

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

    return {
        entry: path.resolve(__dirname, "src/index.tsx"),
        mode: "production",
        devtool: "source-map",
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".json"],
            alias: {
                "@/*": path.resolve(__dirname, "src/*"),
            },
        },
        output: {
            path: process.env.OUTPUT_PATH ?? path.resolve(__dirname, "dist"),
            filename: "[name].[contenthash].js",
            hashDigestLength: 8,
            clean: true,
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
    };
};
