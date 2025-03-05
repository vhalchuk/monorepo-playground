import { now } from "lodash-es";

export const foo = () => {
    console.log("foo() called at", now())
    return "bar";
}