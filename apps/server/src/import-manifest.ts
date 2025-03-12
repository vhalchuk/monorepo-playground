import fs from "node:fs/promises";
import path from "node:path";
import { memoize } from "lodash";
import { WEBPACK_DEV_SERVER_ORIGIN } from "@/constants";

type ClientManifest = {
    entrypoints: {
        main: {
            assets: {
                js: string[];
            };
        };
    };
};

async function importManifest(): Promise<ClientManifest> {
    if (process.env.NODE_ENV === "development") {
        const response = await fetch(
            `${WEBPACK_DEV_SERVER_ORIGIN}/assets-manifest.json`
        );
        const manifest = await response.json();
        return manifest as ClientManifest;
    }

    const data = await fs.readFile(process.env.MANIFEST_PATH!, "utf-8");
    return JSON.parse(data);
}

const memoizedImportManifest = memoize(importManifest);

export default memoizedImportManifest;
