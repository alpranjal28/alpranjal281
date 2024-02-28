"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
// use mapped link from navbar

const NavLink = ({ link }: any) => {
  const pathName = usePathname();
  // console.log(`this is ${pathName}`);

  return (
    <Link
      className={`rounded p-1 ${
        pathName === link.url && "bg-black text-white"
      }`}
      href={link.url}
    >
      {link.title}
    </Link>
  );
};

export default NavLink;
