import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { configureStore } from "@reduxjs/toolkit";

type Post = {
    id: string;
    title: string;
    body: string;
};

export const apiSlice = createApi({
    reducerPath: "api", // Name for the slice in the store
    baseQuery: fetchBaseQuery({
        baseUrl: "https://jsonplaceholder.typicode.com/",
    }),
    endpoints: (builder) => ({
        getPosts: builder.query<Post[], void>({
            query: () => "posts",
        }),
    }),
});

export const { useGetPostsQuery } = apiSlice;

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    // Adding the API middleware for caching and other features
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
