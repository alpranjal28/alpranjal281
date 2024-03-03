"use client";
import Loading from "@/components/layout/Loading";
import UserTabs from "@/components/layout/UserTabs";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const session = useSession();
  const { status } = session;
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [phone, setPhone] = useState<number>();
  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [postalCode, setPostalCode] = useState<number>();
  const [country, setCountry] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [profileFetched, setProfileFetched] = useState(false);
  // const userEmail = session.data?.user?.email;

  async function handleProfileInfoUpdate(ev: any) {
    ev.preventDefault();

    const savingPromise = new Promise(async (resolve, reject) => {
      const resp = await fetch("/api/profile", {
        method: "PUT",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify({
          name: userName,
          image,
          phone,
          address,
          city,
          postalCode,
          country,
        }),
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

  async function handleFileChange(ev: any) {
    const files = ev.target.files;
    if (files?.length === 1) {
      const data = new FormData();
      data.set("file", files[0]);

      const uploadPromise = fetch("/api/upload", {
        method: "POST",
        body: data,
      }).then(async (resp) => {
        if (resp.ok) {
          const link = await resp.json();
          console.log("profilePage fileHandler-link", link); /////
          setImage(link); //link of s3 image comes perfectly
        }
        throw new Error("Error uploading image!");
      });

      await toast.promise(uploadPromise, {
        loading: "Uploading...",
        success: "Image uploaded!",
        error: "Error uploading image!",
      });
    }
  }

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/profile").then(async (resp) => {
        if (resp.ok) {
          const data = await resp.json();
          setPhone(data.phone);
          setAddress(data.address);
          setCity(data.city);
          setPostalCode(data.postalCode);
          setCountry(data.country);
          setUserName(data.name);
          setImage(data.image);
          setIsAdmin(data.admin);
          setUserEmail(data.email);
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
      <div className=" max-w-md mx-auto">
        <div className="flex justify-center gap-6">
          <div className="">
            <div className="p-1 rounded-lg text-center">
              {image && (
                <Image
                  className="rounded-lg mt-5"
                  src={`${image}`}
                  width={96}
                  height={96}
                  alt="userImage"
                  priority={true}
                />
              )}
              <label>
                <input
                  type="file"
                  className=" hidden"
                  onChange={handleFileChange}
                />
                <span
                  className="block border-2 border-gray-300 cursor-pointer 
                font-semibold py-2 px-8 rounded-lg"
                >
                  Edit
                </span>
              </label>
              {/* <button type="button">Edit</button> */}
            </div>
          </div>

          <form className="grow" onSubmit={handleProfileInfoUpdate}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="First and last name"
              value={`${userName}`}
              onChange={(ev) => setUserName(ev.target.value)}
            />
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={`${userEmail}`}
              placeholder="email"
              disabled
            />
            <label htmlFor="number">Number</label>
            <input
              id="number"
              type="number"
              placeholder="phone number"
              value={`${phone}`}
              onChange={(ev) => setPhone(ev.target.valueAsNumber)}
            />
            <label htmlFor="address">Street address</label>
            <input
              id="address"
              type="text"
              placeholder="street address"
              value={`${address}`}
              onChange={(ev) => setAddress(ev.target.value)}
            />
            <div className="flex gap-2">
              <div className="">
                <label htmlFor="city">City</label>
                <input
                  id="city"
                  style={{ margin: 0 }}
                  type="text"
                  placeholder="city"
                  value={`${city}`}
                  onChange={(ev) => setCity(ev.target.value)}
                />
              </div>
              <div className="">
                <label htmlFor="postalCode">Postal code</label>
                <input
                  id="postalCode"
                  style={{ margin: 0 }}
                  type="number"
                  placeholder="postal code"
                  value={`${postalCode}`}
                  onChange={(ev) => setPostalCode(ev.target.valueAsNumber)}
                />
              </div>
            </div>
            <label htmlFor="country">Country</label>
            <input
              id="country"
              type="text"
              placeholder="country"
              value={`${country}`}
              onChange={(ev) => setCountry(ev.target.value)}
            />
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </section>
  );
}
