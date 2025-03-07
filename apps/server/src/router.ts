import { Router } from "express";
import loadManifest from "./loadManifest";

const router = Router();

router.get("/", (req, res) => {
    const script = process.env.NODE_ENV === "development"
        ? "http://localhost:4000/bundle.js"
        : loadManifest().entrypoints.main.assets.js[0];

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');

    res
        .status(200)
        .send(`
            <script src="${script}" type="text/javascript" defer></script>
            <div id="root"></div>
        `);
})

export default router;