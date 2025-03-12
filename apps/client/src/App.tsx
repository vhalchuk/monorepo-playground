import { foo } from "@my-repo/shared";
import { Provider } from "react-redux";
import { store, useGetPostsQuery } from "@/redux";
import { StrictMode } from "react";

function Posts() {
    const { data: posts, isLoading } = useGetPostsQuery();

    if (isLoading) {
        return <span>Loading...</span>;
    }

    return (
        <ul>
            {posts?.slice(0, 10).map((post) => {
                return <li key={post.id}>{post.title}</li>;
            })}
        </ul>
    );
}

export default function App() {
    console.log(foo());

    return (
        <StrictMode>
            <Provider store={store}>
                <Posts />
            </Provider>
        </StrictMode>
    );
}
