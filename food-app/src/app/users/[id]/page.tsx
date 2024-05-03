"use client";
import useProfile from "@/components/UseProfile";
import Loading from "@/components/layout/Loading";
import UserForm from "@/components/layout/UserForm";
import UserTabs from "@/components/layout/UserTabs";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function EditUser() {
  const { loading, admin } = useProfile();
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/api/profile?_id=" + id).then((res) => {
      res.json().then((user) => {
        setUser(user);
      });
    });
  }, []);

  async function handleSaveButtonCick(ev: any, data: any) {
    ev.preventDefault();
    const savePromise = new Promise(async (resolve, reject) => {
      const resp = await fetch("/api/profile", {
        method: "PUT",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify({ ...data, _id: id }),
      });
      resolve(resp);
      reject(resp);
    });
    toast.promise(savePromise, {
      loading: "Saving...",
      success: "User saved!",
      error: "Error saving user!",
    });
  }

  if (loading) return <Loading />;
  if (!admin) {
    return <h1>You are not an admin</h1>;
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={admin} />
      <div className="mt-8">
        <UserForm user={user!} onSave={handleSaveButtonCick} />
      </div>
    </section>
  );
}
