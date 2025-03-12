const path = require("node:path");
const { merge } = require("webpack-merge");
const { clientRootPath, baseConfig } = require("./base.cjs");

module.exports = merge(baseConfig, {
    entry: path.join(clientRootPath, "src/ssr-entry.tsx"),
    mode: "production",
    devtool: false,
    output: {
        path: process.env.SSR_ENTRY_OUTPUT_PATH ?? path.join(clientRootPath, "dist"),
        filename: "ssr-entry.js",
        libraryTarget: 'commonjs',
    },
    target: 'node',
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
                                targets: { node: 'current' }, // Target current Node.js
                                modules: 'commonjs',
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
    }
});