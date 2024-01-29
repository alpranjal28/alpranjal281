import { Metadata } from "next";
import Link from "next/link";

type Props = {
    params: {
        productId: string;
    };
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
    const title = await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`number ${params.productId}`);
        }, 100);
    });
    return {
        title: `Product ${title}`,
    };
};

export default function Productdetails({ params }: Props) {
    return (
        <>
            <div>
                <h1>
                    Product Details item {params.productId} rendered from page.tsx
                </h1>
            </div>
            <div>
                <p>go to reviews</p>
                <p>
                    <Link href={`/products/${params.productId}/reviews/2`}>
                        go to details of 2nd review
                    </Link>
                </p>
            </div>
        </>
    );
}
