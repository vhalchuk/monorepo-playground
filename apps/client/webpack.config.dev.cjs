const path = require("node:path");
const WebpackAssetsManifest = require("webpack-assets-manifest");

module.exports = {
    entry: path.resolve(__dirname, "src/index.tsx"),
    mode: "development",
    devtool: "inline-source-map",
    output: {
        publicPath: "/",
        filename: "[name].js",
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
        alias: {
            /* resolves any package's source code within <root>/packages directory */
            "@my-repo/*": path.resolve(__dirname, "../../packages/*/src/index.ts")
        }
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
                            {runtime: "automatic"} // let React be automatically imported
                        ]
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
                    name: 'vendor',
                    chunks: "all"
                },
            },
        },
    },
    plugins: [
        new WebpackAssetsManifest({entrypoints: true}),
    ],
    devServer: {
        port: 4000,
        hot: true,
    },
}