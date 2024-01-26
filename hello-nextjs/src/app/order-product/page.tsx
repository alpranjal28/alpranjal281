"use client";
import { useRouter } from "next/navigation";

export default function OrderProduct() {
    const router = useRouter();
    function handleClick() {
        console.log("placing your order");
        router.push("/"); //like redirect
    }
    return (
        <>
            <h1>order product</h1>
            <button onClick={handleClick}>Place order</button>
        </>
    );
}
