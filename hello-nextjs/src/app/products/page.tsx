import Link from "next/link";

export default function product() {
    const productId = 100;
    return (
        <>
            <Link href={"/"}>Home</Link>
            <h1>Product</h1>
            <p>This is product page</p>
            <ul>
                <li>
                    <Link href={"products/1"}>item 1</Link>
                </li>
                <li>
                    <Link href={"products/2"}>item 2</Link>
                </li>
                <li>
                    <Link href={"products/3"} replace>item 3 with &quot;replace&quot; takes back to root route</Link>
                </li>
                <li>
                    <Link href={`products/${productId}`}>item {productId} w/o hardCoding</Link>
                </li>
            </ul>
        </>
    );
}
