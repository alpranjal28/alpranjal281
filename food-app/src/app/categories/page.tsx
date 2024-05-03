"use client";
import DeleteButton from "@/components/DeleteButton";
import useProfile from "@/components/UseProfile";
import PencilSquare from "@/components/icons/PencilSquare";
import Trash from "@/components/icons/Trash";
import Loading from "@/components/layout/Loading";
import UserTabs from "@/components/layout/UserTabs";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Categories() {
  interface Category {
    _id: string;
    name: string;
  }

  const { loading: profileLoading, data: profileData ,admin } = useProfile();
  const [catItem, setCatItem] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [editedCat, setEditedCat] = useState<Category | null>(null);

  function fetchCategories() {
    fetch("/api/categories").then(async (resp) => {
      resp.json().then((data) => {
        setCategories(data);
      });
    });
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  async function handleCatSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const createCatPromise = new Promise(async (resolve, reject) => {
      const data: { name: string; _id?: string } = { name: catItem };
      if (editedCat) {
        data._id = editedCat._id;
        // console.log(data._id, data.name, editedCat._id, editedCat.name);
      }
      const resp = await fetch("/api/categories", {
        method: editedCat ? "PUT" : "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (resp.ok) {
        setCatItem("");
        fetchCategories();
        setEditedCat(null);
        resolve(true);
      } else {
        reject();
      }
    });
    await toast.promise(createCatPromise, {
      loading: editedCat ? "Updating category..." : "Creating category...",
      success: editedCat ? "Category updated" : "Category created!",
      error: editedCat ? "Error updating category" : "Error creating category",
    });
  }

  async function handleDeleteCat(_id: string) {
    // console.log(_id);
    const deletePromise = new Promise(async (resolve, reject) => {
      const resp = await fetch("/api/categories", {
        method: "DELETE",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify({ _id }),
      });
      if (resp.ok) {
        resolve(true);
      } else {
        reject();
      }
    });

    await toast.promise(deletePromise, {
      loading: "Deleting category...",
      success: "Category deleted!",
      error: "Error deleting category",
    });
    fetchCategories();
  }

  if (profileLoading) {
    return <Loading />;
  }
  if (!profileData) return <div>Not an admin</div>;

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={admin} />
      <form onSubmit={handleCatSubmit}>
        <div>
          <label htmlFor="">
            {editedCat ? "Update category : " : "New category"}
            {editedCat && (
              <>
                <b>{editedCat.name}</b>
              </>
            )}
          </label>
          <div className="flex gap-2 items-center justify-center relative ">
            <input
              type="text"
              className=" grow"
              value={catItem}
              onChange={(ev) => setCatItem(ev.target.value)}
            />
            <button type="submit" className="relative -top-1 max-w-32">
              {editedCat ? "Save" : "Create"}
            </button>
            <button
              type="button"
              className="relative -top-1 max-w-32"
              onClick={() => {
                setEditedCat(null);
                setCatItem("");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>

      <div className="">
        <h2 className="mt-8 text-sm relative left-4 text-gray-500">
          Existing category
        </h2>
        {categories?.length > 0 &&
          categories.map((c) => (
            <div
              key={c._id}
              className=" bg-gray-200 rounded-xl flex gap-2 p-2 px-4 mb-1 justify-between items-center"
            >
              <span className="">{c.name}</span>

              {/* BUTTONS */}
              <span className="inline-flex gap-1 ">
                <button
                  type="button"
                  className="p-1 mx-2 border-0 hover:bg-gray-500 transition-all"
                  onClick={() => {
                    setEditedCat(c);
                    setCatItem(c.name);
                  }}
                >
                  <PencilSquare />
                </button>
                <button
                  type="button"
                  className="p-1 mx-2  border-0  hover:bg-gray-500 transition-all"
                  onClick={() => {
                    handleDeleteCat(c._id);
                  }}
                >
                  <Trash />
                </button>
                <DeleteButton itemLabel={c.name} onDelete={()=>handleDeleteCat(c._id)}/>
              </span>
            </div>
          ))}
      </div>
    </section>
  );
}
