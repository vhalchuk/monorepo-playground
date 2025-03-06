import express from "express";
import router from "./router";
import { clientDist } from "./paths";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";

const port = 8080;
const app = express();

app.use(express.static(clientDist))

if (process.env.NODE_ENV === "development") {
    // @ts-ignore
    const clientConfig = require("../../client/webpack.config.dev.js");
    const compiler = webpack(clientConfig);
    app.use(
        webpackDevMiddleware(compiler, {
        publicPath: "/",
        stats: { colors: true }
      })
    );
    app.use(webpackHotMiddleware(compiler, {
        path: "/__webpack_hmr"
    }));
}

app.use(router);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
