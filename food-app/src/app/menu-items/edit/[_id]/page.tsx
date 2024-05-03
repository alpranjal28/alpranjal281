"use client";
import DeleteButton from "@/components/DeleteButton";
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
  const { loading, admin } = useProfile();
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

  interface MenuItem {
    name: string;
    desc: string;
    image: string;
    basePrice: string;
    _id?: string;
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

  function HandleDelete() {
    const deletingPromise = new Promise(async (resolve, reject) => {
      const resp = await fetch("/api/menu-items", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: _id }),
      });
      if (resp.ok) {
        resolve(resp);
      }
      if (!resp.ok) {
        reject(resp);
      }
    });
    toast.promise(deletingPromise, {
      loading: "Deleting...",
      success: "Item deleted!",
      error: "Error deleting item!",
    });
    setRedirectToItems(true);
    redirect("/menu-items");
  }

  if (loading) return <Loading />;
  if (!admin) {
    return <h1>You are not an admin</h1>;
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
      <MenuItemForm onSubmit={handleFormSubmit} menuItemForForm={menuItem} />
      <DeleteButton itemLabel={menuItem![`name`]} onDelete={HandleDelete} />
    </section>
  );
}
