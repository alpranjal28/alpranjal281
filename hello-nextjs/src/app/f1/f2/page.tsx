import Link from "next/link";

export default function F2() {
    return (
        <div>
            <h1>F2</h1>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
                quod.
            </p>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
                quod.
            </p>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
                quod.
            </p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <h5><Link href={`/f1`}>Go back to F1</Link></h5>
        </div>
    );
}
