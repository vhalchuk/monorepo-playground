/// <reference types="webpack-env" /> - provides types for `global.module` (webpack HMR)
import { hydrateRoot, type Root } from "react-dom/client";
import App from "@/App";

const rootElement = document.getElementById("root")!;
const root: Root = hydrateRoot(rootElement, <App />);

if (module.hot) {
    module.hot.accept("./App", () => {
        root.render(<App />);
    });
}
