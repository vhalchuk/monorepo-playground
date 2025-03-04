import fs from "node:fs";
import path from "node:path";
import {clientDist} from "./paths";

type ClientManifest = {
    entrypoints: {
        main: {
            assets: {
                js: string[];
            }
        }
    }
}

export default function getClientManifest(): ClientManifest {
    const manifestPath = path.join(clientDist, "assets-manifest.json");
    const manifestJSON = fs.readFileSync(manifestPath, "utf8");
    return JSON.parse(manifestJSON);
}