"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useState } from "react";
import { CartContext } from "../AppContext";
import ShoppingCart from "../icons/ShoppingCart";
import HamburgerMenu from "../icons/Hamburger";

const Header = () => {
  const session = useSession();
  const status = session.status;
  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;
  const { cartProducts } = useContext(CartContext);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  if (userName?.includes(" " || "@")) {
    userName = userName.split(" " || "@")[0];
  }

  function AuthLinks({
    status,
    userName,
  }: {
    status: "authenticated" | "unauthenticated" | "loading";
    userName: string | null | undefined;
  }) {
    if (status === "authenticated") {
      return (
        <>
          <Link href={"/profile"} className=" whitespace-nowrap">
            Hi, {userName}
          </Link>
          <button
            onClick={() => signOut()}
            className=" bg-primary py-2 px-6 rounded-full text-white"
          >
            Logout
          </button>
        </>
      );
    }
    if (status === "unauthenticated") {
      return (
        <>
          <Link href={"/login"}>Login</Link>
          <Link
            href={"/register"}
            className=" bg-primary py-2 px-6 rounded-full text-white"
          >
            Register
          </Link>
        </>
      );
    }
  }

  return (
    <header>
      {/* MOBILE */}
      <div className="flex md:hidden justify-between items-center ">
        <Link href="/" className=" text-primary  text-2xl">
          THE ROllS DIARY
        </Link>
        <div className=" flex gap-4 items-center">
          <Link href={"/cart"} className="relative">
            <ShoppingCart />
            <span className="absolute text-white font-medium bg-primary  text-xs rounded-lg -top-2 right-1">
              {cartProducts.length}
            </span>
          </Link>
          <button
            className="p-1 leading-3"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
          >
            <HamburgerMenu />
          </button>
        </div>
      </div>

      {/* MOBILE NAV */}

      {mobileNavOpen && (
        <div
          onClick={() => setMobileNavOpen(false)}
          id="ham"
          className="flex flex-col md:hidden bg-gray-500 p-4 rounded-lg  mt-4 gap-2 text-center"
        >
          <Link href={"/"}>HOME</Link>
          <Link href={"/menu"}>MENU</Link>
          <Link href={"/#about"}>ABOUT</Link>
          <Link href={"/#contact"}>CONTACT</Link>{" "}
          <AuthLinks status={status} userName={userName?.toUpperCase()} />
        </div>
      )}

      {/* DESKTOP */}
      <div className="hidden md:flex items-center justify-between uppercase font-semibold text-gray-600 my-2">
        <nav className=" gap-4 flex justify-between items-center">
          <Link href="/" className=" text-primary  text-2xl">
            THE ROllS DIARY
          </Link>
          <Link href={"/"}>HOME</Link>
          <Link href={"/menu"}>MENU</Link>
          <Link href={"/#about"}>ABOUT</Link>
          <Link href={"/#contact"}>CONTACT</Link>
        </nav>
        <nav className="flex flex-row justify-center items-center gap-4">
          <AuthLinks status={status} userName={userName} />
          {/* CART */}
          <Link href={"/cart"} className="relative">
            <ShoppingCart />
            <span className="absolute text-white font-medium bg-primary  text-xs rounded-lg -top-2 right-1">
              {cartProducts.length}
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
