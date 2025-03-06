import { now } from "lodash";
import { foo } from "@my-repo/shared";


export default function App() {
    const handleClick = () => {
        console.log("Clicked at", now());
        console.log("foo()", foo());
    }

    return <button onClick={handleClick}>Hello world!</button>;
}