import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "@/App";

function renderApp() {
    return ReactDOMServer.renderToString(<App />);
}

export default renderApp;
