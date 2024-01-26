"use client";
//by default every component is server side component
// use client makes it client side component
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./styles.css";
import { useState } from "react";

const navLinks = [
    { name: "Register", href: "/register" },
    { name: "Login", href: "/login" },
    { name: "Forgot Password", href: "/forgot-password" },
];

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [input, setInput] = useState("");//this component will be preserved in layout.tsx and not in template.tsx
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <div>
                <input
                    type="text"
                    placeholder="Enter something"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    style={{border:"solid black 1px",borderRadius:"10px",textAlign:"center"}}
                />
            </div>

            {navLinks.map((link) => {
                const isActive = pathname.startsWith(link.href);

                return (
                    <Link
                        href={link.href}
                        key={link.name}
                        className={
                            isActive ? "font-bold mr-4" : "text-blue-500 mr-4"
                        }
                    >
                        {link.name}
                    </Link>
                );
            })}
            {children}
        </div>
    );
}
