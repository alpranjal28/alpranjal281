export default function ProductDetailsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {children}
            <h2>features product rendered from layout.tsx</h2>
        </>
    );
}
