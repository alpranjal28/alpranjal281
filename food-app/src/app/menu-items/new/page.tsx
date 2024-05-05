"use client";
import useProfile from "@/components/UseProfile";
import Left from "@/components/icons/Left";
import EditableImage from "@/components/layout/EditableImage";
import Loading from "@/components/layout/Loading";
import MenuItemForm from "@/components/layout/MenuItemForm";
import UserTabs from "@/components/layout/UserTabs";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

export default function NewMenuItemsPage() {
  const { loading, admin } = useProfile();
  const [redirectToItems, setRedirectToItems] = useState(false);

  if (loading) return <Loading />;
  if (!admin) {
    return <h1>You are not an admin</h1>;
  }

  
  interface MenuItemNew {
    name: string;
    desc: string;
    image: string;
    basePrice: string;
    // _id: string;
  }

  async function handleFormSubmit(
    ev: FormEvent<HTMLFormElement>,
    data: MenuItemNew) {
    ev.preventDefault();
    // data = { image, name, desc, basePrice };
    // console.log(data);
    const savingPromise = new Promise(async (resolve, reject) => {
      const resp = await fetch("/api/menu-items", {
        method: "POST",
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
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={admin} />
      <div className="">
        <Link className="button" href={"/menu-items"}>
          <Left /> Show all menu items
        </Link>
      </div>
      <MenuItemForm onSubmit={handleFormSubmit} menuItemForForm={null}/>
    </section>
  );
}
