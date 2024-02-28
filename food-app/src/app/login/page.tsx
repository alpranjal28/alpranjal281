"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logininProgress, setLogininProgress] = useState(false);

  async function handleFormSubmit(ev: any) {
    ev.preventDefault();
    setLogininProgress(true);
    signIn("credentials", {
      email,
      password,
      // redirect: false,
      callbackUrl: "/",
      // callbackUrlOnError: "/login",
      // callbackUrlOnSuccess: "/dashboard",
    });
    setLogininProgress(false);
  }

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl font-semibold mb-8">
        Login
      </h1>
      <form
        className="block max-w-sm mx-auto text-center"
        onSubmit={handleFormSubmit}
      >
        {/* <input type="text" placeholder="NAME"/> */}
        <input
          type="email"
          placeholder="email"
          name="email"
          typeof="email"
          disabled={logininProgress}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          typeof="password"
          disabled={logininProgress}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button type="submit" disabled={logininProgress}>
          Login
        </button>

        <div className=" text-gray-500 my-4">or login with provider</div>
        <button type="button" disabled={logininProgress} onClick={()=>signIn("google", {callbackUrl:"/"})} className="flex flex-row items-center justify-center gap-4">
          <Image src={"/google.png"} alt="google" width={30} height={30} />
          Login with google
        </button>
      </form>
    </section>
  );
}
