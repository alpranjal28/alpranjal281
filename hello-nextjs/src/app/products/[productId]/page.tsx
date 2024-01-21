export default function Productdetails({
    params,
}: {
    params: { productId: string };
}) {
    return (
        <div>
            <h1>Product Details item {params.productId}</h1>
        </div>
    );
}
