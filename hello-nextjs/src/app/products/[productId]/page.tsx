import { Metadata } from "next";

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
        <div>
            <h1>Product Details item {params.productId} rendered from page.tsx</h1>
        </div>
    );
}
