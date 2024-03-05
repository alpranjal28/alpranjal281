"use client";
import useProfile from "@/components/UseProfile";
import Left from "@/components/icons/Left";
import EditableImage from "@/components/layout/EditableImage";
import Loading from "@/components/layout/Loading";
import MenuItemForm from "@/components/layout/MenuItemForm";
import UserTabs from "@/components/layout/UserTabs";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function EditMenuItemPage() {
  const { _id }: { _id: string } = useParams();
  const { loading, data } = useProfile();
  const [menuItem, setMenuitem] = useState(null);
  const [redirectToItems, setRedirectToItems] = useState(false);

  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((Items) => {
        const item = Items.find((item: any) => item._id === _id);
        setMenuitem(item);
      });
    });
  }, []);

  if (loading) return <Loading />;
  if (!data) {
    return <h1>You are not an admin</h1>;
  }

  interface MenuItem {
    name: string;
    desc: string;
    image: string;
    basePrice: string;
    _id: string;
  }

  async function handleFormSubmit(
    ev: FormEvent<HTMLFormElement>,
    data: MenuItem
  ) {
    ev.preventDefault();
    data = { ...data, _id: _id };
    const savingPromise = new Promise(async (resolve, reject) => {
      const resp = await fetch("/api/menu-items", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (resp.ok) {
        resolve(resp);
      }
      if (!resp.ok) {
        reject(resp);
      }
    });
    await toast.promise(savingPromise, {
      loading: "Saving...",
      success: "Item saved!",
      error: "Error saving item!",
    });
    setRedirectToItems(true);
  }
  if (redirectToItems) {
    return redirect("/menu-items");
  }

  return (
    <section className="mt-8 max-w-lg mx-auto">
      <UserTabs isAdmin={true} />
      <div className="">
        <Link className="button" href={"/menu-items"}>
          <Left /> Show all menu items
        </Link>
      </div>
      <MenuItemForm onSubmit={handleFormSubmit} menuItemForForm={menuItem} />
    </section>
  );
}
