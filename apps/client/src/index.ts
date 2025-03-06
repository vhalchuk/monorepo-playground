import { createRoot } from "react-dom/client";
import { createElement } from "react"
import { now } from "lodash-es";
import { foo } from "@my-repo/shared";

console.log(foo());
console.log("Now:", now());

const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);
root.render(createElement("h1", null, "Hello World!"));

// @ts-ignore
if (module.hot) module.hot.accept();