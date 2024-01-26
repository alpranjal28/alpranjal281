import Link from "next/link";

export default function Head() {
    return (
        <header
            style={{
                backgroundColor: "#333",
                padding: "1rem",
                width: "100%",
            }}
        >
            <p>Header</p>
            <h1>
                <Link href={`/`} style={{ textDecoration: "none" }}>
                    Home
                </Link>
            </h1>
        </header>
    );
}
