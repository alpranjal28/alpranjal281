"use client";
import useProfile from "@/components/UseProfile";
import Left from "@/components/icons/Left";
import EditableImage from "@/components/layout/EditableImage";
import Loading from "@/components/layout/Loading";
import UserTabs from "@/components/layout/UserTabs";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function NewMenuItemsPage() {
  const { loading, data } = useProfile();
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [redirectToItems, setRedirectToItems] = useState(false);

  if (loading) return <Loading />;
  if (!data) {
    return <h1>You are not an admin</h1>;
  }

  async function handleFormSubmit(e: any) {
    e.preventDefault();
    const data = { image, name, desc, basePrice };
    console.log(data);
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
    <section className="mt-8 max-w-lg mx-auto">
      <UserTabs isAdmin={true} />
      <div className="">
        <Link className="button" href={"/menu-items"}>
          <Left /> Show all menu items
        </Link>
      </div>
      <form onSubmit={handleFormSubmit} className="mt-8">
        <div
          className="grid items-start gap-4"
          style={{ gridTemplateColumns: ".3fr .7fr" }}
        >
          <div className="max-w-[200px] max-h-[200px]">
            <EditableImage link={image} setLink={setImage} />
          </div>
          <div className="grow">
            <label htmlFor="item-name">Item name</label>
            <input
              type="text"
              id="item-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="item-desc">Description</label>
            <input
              type="text"
              id="item-desc"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <label htmlFor="item-b-price">Base price</label>
            <input
              type="text"
              id="item-b-price"
              value={basePrice}
              onChange={(e) => setBasePrice(e.target.value)}
            />
            <button type="submit">Save</button>
          </div>
        </div>
      </form>
    </section>
  );
}
