const path = require("node:path");

const repoRootPath = path.resolve(__dirname, "../../..");
const clientRootPath = path.resolve(__dirname, "..");

module.exports = {
    clientRootPath,
    baseConfig: {
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".json"],
            alias: {
                "@/*": path.join(clientRootPath, "src/*"),
                /* resolves any package's source code within <root>/packages directory */
                "@my-repo/*": path.join(repoRootPath, "packages/*/src/index.ts"),
            },
        }
    },
}