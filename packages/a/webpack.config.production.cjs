const path = require("node:path");

module.exports = {
    entry: path.resolve(__dirname, "src/index.js"),
    mode: "development",
    output: {
        filename: "bundle.production.js",
    }
}