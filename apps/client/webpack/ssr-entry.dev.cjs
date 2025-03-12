const path = require("node:path");
const { merge } = require("webpack-merge");
const { clientRootPath, baseConfig } = require("./base.cjs");

module.exports = merge(baseConfig, {
    mode: "development",
    devtool: "inline-source-map",
    watch: true,
    entry: path.join(clientRootPath, "src/ssr-entry.tsx"),
    output: {
        path: process.env.SSR_ENTRY_OUTPUT_PATH ?? path.join(clientRootPath, "dist"),
        filename: "ssr-entry.js",
        libraryTarget: "commonjs",
    },
    target: "node",
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
                                targets: { node: "current" },
                                modules: "commonjs",
                            },
                        ],
                        "@babel/preset-typescript",
                        [
                            "@babel/preset-react",
                            { runtime: "automatic" },
                        ],
                    ],
                },
            },
        ],
    },

    // Tell Webpack not to bundle React itself for SSR.
    // You want the Node runtime to load it as a commonjs module.
    externals: {
        react: "commonjs react",
        "react-dom/server": "commonjs react-dom/server",
    },
});
