"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(false);

  async function handleFormSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    setCreatingUser(true);

    try {
      await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      setCreatingUser(false);
      setUserCreated(true);
    } catch (err) {
      setError(true);
    }
  }

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl font-semibold mb-8">
        Register
      </h1>
      {userCreated && (
        <div className="text-center">
          User created. <br />
          Now you can &nbsp;
          <Link className="text-green-600 underline" href={"/login"}>
            login &raquo;
          </Link>
        </div>
      )}
      {error && (
        <div className="text-center text-red-500">
          Something went wrong.
          <br />
          Please try again &nbsp;
        </div>
      )}

      <form
        className="block max-w-sm mx-auto text-center"
        onSubmit={handleFormSubmit}
      >
        {/* <input type="text" placeholder="NAME"/> */}
        <input
          type="email"
          placeholder="email"
          disabled={creatingUser}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          disabled={creatingUser}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        
        <button type="submit" disabled={creatingUser}>
          Register
        </button>

        <div className=" text-gray-500 my-4">or login with provider</div>

        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="flex flex-row items-center justify-center gap-4"
        >
          <Image src={"/google.png"} alt="google" width={30} height={30} />
          Login with google
        </button>

        <div className=" text-gray-500 my-4">
          Already have an account? &nbsp;
          <Link className="text-green-600 underline" href={"/login"}>
            Login &raquo;
          </Link>
        </div>
      </form>
    </section>
  );
}
