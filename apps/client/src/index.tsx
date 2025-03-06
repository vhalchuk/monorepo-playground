import { createRoot } from "react-dom/client";
import { now } from "lodash";
import { foo } from "@my-repo/shared";
import App from "./App";

console.log(foo());
console.log("Now:", now());

const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);
root.render(<App />);

// @ts-ignore
if (module.hot) module.hot.accept();