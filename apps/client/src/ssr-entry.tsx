import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "@/App";
import { apiSlice, store } from "@/redux";
import type { RenderAppOnServer } from "@my-repo/shared";

const renderApp: RenderAppOnServer = async () => {
    store.dispatch(apiSlice.endpoints.getPosts.initiate());

    await Promise.all(store.dispatch(apiSlice.util.getRunningQueriesThunk()));

    const preloadedState = store.getState();

    return {
        preloadedState,
        html: ReactDOMServer.renderToString(<App />),
    };
};

export default renderApp;
