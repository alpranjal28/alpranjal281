import { notFound } from "next/navigation";

export default function ReviewDetail({
    params,
}: {
    params: {
        productId: string;
        reviewId: string;
    };
}) {
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
