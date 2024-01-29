import Link from "next/link";

export default function Home() {
    return (
        <>
            <h1>WELCOME TO HOME PAGE</h1>
            <Link href="/blog">Blog</Link>
            <br />
            <Link href="/products">Products</Link>
            <br />
            <Link href="/docs">Docs</Link>
            <br />
            <Link href="/about">About</Link>
            <br />
            <Link href="/login">Login</Link>
            <br />
            <Link href="/register">Register</Link>
            <br />
            <Link href="/order-product">Order Product</Link>
            <br />
            <Link href="/dashboard">Dashboard</Link>
            <br />
            <Link href="/complex-dashboard">Complex dashboard</Link>
            <br />
        </>
    );
}
