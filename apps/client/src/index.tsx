/// <reference types="webpack-env" /> - provides types for `global.module` object with HMR API
import { createRoot, type Root } from "react-dom/client";
import App from "./App";

const rootElement = document.getElementById("root")!;
const root: Root = module.hot?.data?.root ?? createRoot(rootElement);

root.render(<App />);

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(data => {
    console.log("root saved")
    data.root = root;
  });
}