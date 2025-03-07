import express from "express";
import type { Request, Response } from "express";
import router from "@/router";
import { WEBPACK_DEV_SERVER_ORIGIN } from "@/constants";

const port = 8080;
const app = express();

app.use(express.static("public"));

if (process.env.NODE_ENV === "development") {
    (async () => {
        const { createProxyMiddleware } = await import("http-proxy-middleware");

        const webpackDevServerProxy = createProxyMiddleware<Request, Response>({
            target: WEBPACK_DEV_SERVER_ORIGIN,
            changeOrigin: true,
        });

        app.use(webpackDevServerProxy);
    })();
}

app.use(router);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
