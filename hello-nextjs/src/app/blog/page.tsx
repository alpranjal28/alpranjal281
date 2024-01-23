import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog",
}; //this blog will replace %s in root layout

export default function Blog() {
    return (
        <div>
            <h1>Blog</h1>
        </div>
    );
}
