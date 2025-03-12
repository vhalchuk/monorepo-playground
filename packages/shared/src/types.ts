export type RenderAppOnServer = () => Promise<{
    preloadedState: Record<string, unknown>;
    html: string;
}>;
