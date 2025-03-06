import { Router } from "express";
import { now } from "lodash";
import { foo } from "@my-repo/shared";
import getClientManifest from "./getClientManifest";

const router = Router();

router.get("/", (req, res) => {
    console.log("Request received at:", now());
    console.log("shared foo()", foo())

    const script = process.env.NODE_ENV === "production"
        ? getClientManifest().entrypoints.main.assets.js[0]
        : "bundle.js";

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');

    res
        .status(200)
        .send(`
            <script src="${script}" type="text/javascript" defer></script>
            <div id="root"></div>
        `.trim());
})

export default router;