"use client"
import Link from "next/link";
import wonders from "./wonders";
import Image from "next/image";

export default function WondersHome() {
    return (
        <main>
             <h1 className="text-center text-3xl font-bold my-4">
                New Wonders of the World
            </h1>
            <div>
            {wonders.map(({ id, src, name }) => (
                    <Link key={id} href={`/photo-feed/${id}`}>
                        <Image
                            alt={name}
                            src={src}
                            className="w-full object-cover aspect-square"
                        />
                    </Link>
                ))}
            </div>
        </main>
    );
}
