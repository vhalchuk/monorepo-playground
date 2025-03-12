export default async function renderApp(): Promise<string> {
    const render = (await import(process.env.SSR_ENTRY_PATH!).then(
        (m) => m.default
    )) as () => string;

    return render();
}
