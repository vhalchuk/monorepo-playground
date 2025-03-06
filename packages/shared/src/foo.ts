import { now } from "lodash";

export const foo = () => {
    console.log("foo() called at", now())
    return "bar";
}
