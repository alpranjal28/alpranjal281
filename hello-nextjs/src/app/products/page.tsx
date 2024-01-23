import Link from "next/link";

export default function product() {
    return (
        <>
            <Link href={"/"}>Home</Link>
            <h1>Product</h1>
            <p>This is product page</p>
            <ul>
                <li>item 1</li>
                <li>item 2</li>
                <li>item 3</li>
            </ul>
        </>
    );
}
