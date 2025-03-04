import { Router } from "express";
import { foo } from "@my-repo/shared";
import getClientManifest from "./getClientManifest";

const router = Router();

router.get("/", (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');

    res
        .status(200)
        .send(`
            <script src="${getClientManifest().entrypoints.main.assets.js}" type="text/javascript" defer></script>
            <h1>${foo()}</h1>
        `.trim());
})

export default router;