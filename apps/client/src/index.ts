import { createRoot } from "react-dom/client";
import { createElement } from "react"
import { now } from "lodash-es";
import { foo } from "@my-repo/shared";

console.log(foo());
console.log("Now:", now());

createRoot(document.getElementById("root")!).render(createElement("h1", null, "Hello World!"))
