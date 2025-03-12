import { Router } from "express";
import { foo } from "@my-repo/shared";
import loadManifest from "@/import-manifest";
import importSSRFunction from "@/import-ssr-function";

const router = Router();

router.get("/", async (req, res) => {
    const manifest = await loadManifest();
    const scripts = manifest.entrypoints.main.assets.js;
    const jsResources = scripts
        .map(
            (src) =>
                `<script src="${src}" type="text/javascript" defer></script>`
        )
        .join("\n");

    console.log(foo());

    const render = await importSSRFunction();
    const { preloadedState, html } = await render();
    const preloadedStateScript = `<script>window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)};</script>`;

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.write(jsResources);
    res.write(preloadedStateScript);
    res.write(`<div id="root">${html}</div>`);
    res.end();
});

export default router;
