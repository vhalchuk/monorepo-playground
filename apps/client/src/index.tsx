/// <reference types="webpack-env" /> - provides types for `global.module` (webpack HMR)
import { createRoot, type Root } from "react-dom/client";
import App from "./App";

const rootElement = document.getElementById("root")!;
const root: Root = module.hot?.data?.root ?? createRoot(rootElement);

root.render(<App />);

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(data => {
    data.root = root;
  });
}