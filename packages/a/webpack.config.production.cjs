const path = require("node:path");
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = (env = {}) => {
    const plugins = [];

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
            filename: "bundle.production.js",
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