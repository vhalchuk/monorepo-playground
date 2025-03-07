import fs from "node:fs";
import path from "node:path";
import { memoize } from "lodash";

type ClientManifest = {
    entrypoints: {
        main: {
            assets: {
                js: string[];
            }
        }
    }
}

function loadManifest(): ClientManifest {
  const manifestPath = path.resolve(process.cwd(), 'public', 'assets-manifest.json');
  const data = fs.readFileSync(manifestPath, "utf-8");
  return JSON.parse(data);
}

const memoizedLoadManifest = memoize(loadManifest);

export default memoizedLoadManifest;