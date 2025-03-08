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

async function loadManifest(): Promise<ClientManifest> {
    if (process.env.NODE_ENV === "development") {
        const response = await fetch(
            `${WEBPACK_DEV_SERVER_ORIGIN}/assets-manifest.json`
        );
        const manifest = await response.json();
        return manifest as ClientManifest;
    }

    const manifestPath = path.resolve(
        process.cwd(),
        "public",
        "assets-manifest.json"
    );
    const data = await fs.readFile(manifestPath, "utf-8");
    return JSON.parse(data);
}

const memoizedLoadManifest = memoize(loadManifest);

export default memoizedLoadManifest;
