import { Router } from "express";
import { foo } from "@my-repo/shared";
import loadManifest from "@/loadManifest";

const router = Router();

router.get("/", async (req, res) => {
    const manifest = await loadManifest();
    const scripts = manifest.entrypoints.main.assets.js;

    console.log(foo());

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");

    res.status(200).send(`
            ${scripts.map((src) => `<script src="${src}" type="text/javascript" defer></script>`).join("\n")}
            <div id="root"></div>
        `);
});

export default router;
