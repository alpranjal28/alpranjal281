"use client";
import { notFound } from "next/navigation";

function getRandomNo(count: number) {
    return Math.floor(Math.random() * count);
}

export default function ReviewDetail({
    params,
}: {
    params: {
        productId: string;
        reviewId: string;
    };
}) {
    //error handling

    // const random = getRandomNo(2);

    // if (random === 1) {
    //     throw new Error("error loading review");
    // }

    if (parseInt(params.reviewId) > 1000) {
        notFound();
    }

    return (
        <div>
            <h1>Review Detail of product {params.productId}</h1>
            <p>review number {params.reviewId}</p>
        </div>
    );
}
