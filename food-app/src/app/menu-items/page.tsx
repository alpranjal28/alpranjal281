"use client";
import useProfile from "@/components/UseProfile";
import MenuCardAdmin from "@/components/card/MenuCardAdmin";
import Right from "@/components/icons/Right";
import Loading from "@/components/layout/Loading";
import UserTabs from "@/components/layout/UserTabs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MenuItemsPage() {
  interface MenuItem {
    _id: string;
    name: string;
    desc: string;
    basePrice: number;
    image: string;
  }

  const { loading, admin } = useProfile();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  useEffect(() => {
    fetch("/api/menu-items").then((res) =>
      res.json().then((menuItems) => {
        setMenuItems(menuItems);
      })
    );
  }, []);

  if (loading) {
    return <Loading />;
  }
  if (!admin) {
    return <h1>You are not an admin</h1>;
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={admin} />
      <div className="mt-8">
        <Link className="button " href={"/menu-items/new"}>
          Create new menu item &nbsp;
          <Right />
        </Link>
      </div>
      <div className="">
        <h2 className="text-sm text-gray-500 mt-8">Edit menu items:</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {menuItems?.length > 0 &&
            menuItems.map((item) => (
              <MenuCardAdmin key={item._id} {...item}/>
            ))}
        </div>
      </div>
    </section>
  );
}
