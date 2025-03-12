import type { RenderAppOnServer } from "@my-repo/shared";

export default async function importSSRFunction(): Promise<RenderAppOnServer> {
    return await import(process.env.SSR_ENTRY_PATH!).then((m) => m.default);
}
