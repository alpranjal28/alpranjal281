"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "../AppContext";
import ShoppingCart from "../icons/ShoppingCart";

const Header = () => {
  const session = useSession();
  const status = session.status;
  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;
  const { cartProducts } = useContext(CartContext);
  if (userName?.includes(" " || "@")) {
    userName = userName.split(" " || "@")[0];
  }

  return (
    <header className=" my-2 flex items-center justify-between uppercase font-semibold text-gray-600">
      <nav className=" gap-6 flex justify-between items-center">
        <Link href="/" className=" text-primary  text-2xl">
          THE ROllS DIARY
        </Link>
        <Link href={"/"}>HOME</Link>
        <Link href={"/menu"}>MENU</Link>
        <Link href={"/#about"}>ABOUT</Link>
        <Link href={"/#contact"}>CONTACT</Link>
      </nav>
      <nav className="flex flex-row justify-center items-center gap-4">
        {status === "authenticated" && (
          <>
            <Link href={"/profile"} className=" whitespace-nowrap">
              Hello, {userName}
            </Link>
            <button
              onClick={() => signOut()}
              className=" bg-primary py-2 px-6 rounded-full text-white"
            >
              Logout
            </button>
          </>
        )}
        {status === "unauthenticated" && (
          <>
            <Link href={"/login"}>Login</Link>
            <Link
              href={"/register"}
              className=" bg-primary py-2 px-6 rounded-full text-white"
            >
              Register
            </Link>
          </>
        )}

        {/* CART */}
        <Link href={"/cart"} className="relative">
          <ShoppingCart />
          <span className="absolute text-white font-medium bg-primary  text-xs rounded-lg -top-2 right-1">{cartProducts.length}</span>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
