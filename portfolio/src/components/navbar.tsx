"use client";
import Link from "next/link";
import { useState } from "react";
import NavLink from "./navLink";
import { motion } from "framer-motion";
import Image from "next/image";

const links = [
  { url: "/", title: "Home" },
  { url: "/about", title: "About" },
  { url: "/portfolio", title: "Portfolio" },
  { url: "/contact", title: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  function toggle() {
    setOpen(!open);
  }

  const topVariants = {
    closed: {
      rotate: 0,
    },
    opened: {
      rotate: 45,
      backgroundColor: "white",
    },
  };

  const centerVariants = {
    closed: {
      opacity: 1,
    },
    opened: {
      opacity: 0,
    },
  };

  const bottomVariants = {
    closed: {
      rotate: 0,
    },
    opened: {
      rotate: -45,
      backgroundColor: "white",
    },
  };

  const listVariants = {
    closed: {
      x: "100vw",
    },
    opened: {
      x: 0,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const listItemVariants = {
    closed: {
      x: -10,
      opacity: 0,
    },
    opened: {
      x: 0,
      opacity: 1,
    },
  };

  return (
    <div className="h-full  sticky top-0 flex items-center justify-between px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48 text-xl">
      {/* LINKS */}
      <div className="hidden md:flex gap-4 w-1/3">
        {links.map((link) => (
          <NavLink link={link} key={link.title} />
        ))}
      </div>
      {/* LOGO */}
      <div className="md:hidden lg:flex xl:w-1/3 xl:justify-center">
        <Link
          href="/"
          className="text-sm bg-black rounded-md p-1 font-semibold flex items-center justify-center"
        >
          <span className="text-white mr-1">Pranjal</span>
          <span className="w-12 h-8 rounded bg-white text-black flex items-center justify-center">
            Lakra
          </span>
        </Link>
      </div>
      {/* SOCIAL */}
      <div className="hidden md:flex justify-end gap-4 w-1/3">
        <Link href={"https://github.com/alpranjal28"}>
          <Image src="/github-mark.png" alt="github" width={32} height={32} />
        </Link>
        <Link href={"https://www.linkedin.com/in/pranjal-altherius-lakra/"}>
          <Image src="/linkedin.png" alt="linkedin" width={32} height={32} />
        </Link>
      </div>
      {/* RESPONSIVE MENU */}
      <div className="md:hidden">
        {/* MENU BUTTON */}
        <button
          className="w-10 h-8 flex flex-col justify-between z-50 relative mr-4"
          onClick={toggle}
        >
          <motion.div
            variants={topVariants}
            animate={open ? "opened" : "closed"}
            className="w-10 h-1 bg-black rounded origin-left"
          ></motion.div>
          <motion.div
            variants={centerVariants}
            animate={open ? "opened" : "closed"}
            className="w-10 h-1 bg-black rounded"
          ></motion.div>
          <motion.div
            variants={bottomVariants}
            animate={open ? "opened" : "closed"}
            className="w-10 h-1 bg-black rounded origin-left"
          ></motion.div>
        </button>
        {/* MENU LIST */}
        {open && (
          <motion.div
            variants={listVariants}
            initial="closed"
            animate="opened"
            className="absolute top-0 left-0 w-screen h-screen bg-black text-white flex flex-col items-center justify-center gap-8 text-4xl z-40"
          >
            {links.map((link) => (
              <motion.div
                variants={listItemVariants}
                className=""
                key={link.title}
              >
                <Link href={link.url}>{link.title}</Link>
              </motion.div>
            ))}
            <motion.div
              variants={listItemVariants}
              className=" flex flex-row space-x-4 "
            >
              <Link href={"https://github.com/alpranjal28"}>
                <Image
                  src="/github-mark-white.png"
                  alt="github"
                  width={32}
                  height={32}
                />
              </Link>
              <Link
                href={"https://www.linkedin.com/in/pranjal-altherius-lakra/"}
              >
                <Image
                  src="/linkedin-blue.png"
                  alt="linkedin"
                  width={32}
                  height={32}
                />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
export default Navbar;

{
}
