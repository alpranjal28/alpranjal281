"use client";
import EditableImage from "@/components/layout/EditableImage";
import Loading from "@/components/layout/Loading";
import UserForm from "@/components/layout/UserForm";
import UserTabs from "@/components/layout/UserTabs";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface User {
  _id?: string;
  name: string;
  email: string;
  phone: number;
  address: string;
  city: string;
  postalCode: number;
  country: string;
  image: string;
  admin: boolean;
}

export default function ProfilePage() {
  const session = useSession();
  const { status } = session;
  // const [userName, setUserName] = useState<string>("");
  // const [userEmail, setUserEmail] = useState<string>("");
  // const [phone, setPhone] = useState<number>();
  // const [address, setAddress] = useState<string>("");
  // const [city, setCity] = useState<string>("");
  // const [postalCode, setPostalCode] = useState<number>();
  // const [country, setCountry] = useState<string>("");
  // const [image, setImage] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [profileFetched, setProfileFetched] = useState(false);
  // const userEmail = session.data?.user?.email;

  const [user, setUser] = useState<User>();

  async function handleProfileInfoUpdate(ev: any, data: any) {
    ev.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      const resp = await fetch("/api/profile", {
        method: "PUT",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      resolve(resp);
      reject(resp);
    });
    toast.promise(savingPromise, {
      loading: "Saving...",
      success: "Profile saved!",
      error: "Error saving profile!",
    });
  }

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/profile").then(async (resp) => {
        if (resp.ok) {
          const data = await resp.json();
          // setPhone(data.phone);
          // setAddress(data.address);
          // setCity(data.city);
          // setPostalCode(data.postalCode);
          // setCountry(data.country);
          // setUserName(data.name);
          // setImage(data.image);
          setUser(data);
          setIsAdmin(data.admin);
          // setUserEmail(data.email);
          setProfileFetched(true);
        }
      });
    }
  }, [session, status]);

  if (status === "loading" || !profileFetched) {
    return <Loading />;
  }
  if (status === "unauthenticated") {
    redirect("/login");
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={isAdmin} />

      {/* <h1 className="text-center text-primary text-4xl font-semibold mb-8">
        Profile
      </h1> */}
      <div className=" max-w-2xl mx-auto">
        <UserForm user={user!} onSave={handleProfileInfoUpdate} />
      </div>
    </section>
  );
}
