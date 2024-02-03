import Link from "next/link";

export default function F4() {
    return (
        <div>
            <h1>F4</h1>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
                quod. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Commodi, in vel iure autem similique nihil culpa asperiores maxime
                mollitia necessitatibus accusantium quisquam nam deserunt possimus ab
                placeat! Eos, quibusdam totam.
            </p>
            
            <h5>
                <Link href={`/f1/f3`}>Go back to F3 &#40;will be intercepted&#41;</Link>
            </h5>
            <h5>
                <Link href={`/about`}>Go to About page on root directory &#40;will be intercepted&#41;</Link>
            </h5>
        </div>
    );
}
