"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function ProfilePage() {
  const session = useSession();
  const { status } = session;
  const [userName, setUserName] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleProfileInfoUpdate(ev: any) {
    ev.preventDefault();
    setSaved(false);
    setIsSaving(true);
    const resp = await fetch("/api/profile", {
      method: "PUT",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({ name: userName, image }),
    });
    if (resp.ok) {
      setIsSaving(false);
      setSaved(true);
    }
  }

  async function handleFileChange(ev: any) {
    const files = ev.target.files;
    if (files?.length === 1) {
      const data = new FormData();
      data.set("file", files[0]);
      const resp = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      const link: string = await resp.json(); //link of s3 image comes perfectly
      setImage(link);
    }
  }

  useEffect(() => {
    if (status === "authenticated") {
      const userName = session.data?.user?.name as string;
      const userImage = session.data?.user?.image as string;
      setUserName(userName);
      setImage(userImage);
    }
  }, [session, status]);

  const userEmail = session.data?.user?.email;
  // console.log(userName);

  if (status === "loading") {
    return (
      <section className="mt-8">
        <h1 className="text-center text-primary text-4xl font-semibold mb-8">
          Loading...
        </h1>
      </section>
    );
  }
  if (status === "unauthenticated") {
    redirect("/login");
  }

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl font-semibold mb-8">
        Profile
      </h1>
      <div className=" max-w-md mx-auto">
        {saved && (
          <h2
            className=" bg-green-100 text-center font-medium p-4 rounded-xl
          border border-green-300"
          >
            Profile saved!
          </h2>
        )}
        {isSaving && (
          <h2
            className=" bg-gray-100 text-center font-medium p-4 rounded-xl
          border border-gray-300"
          >
            Saving profile...
          </h2>
        )}

        <div className="flex justify-center items-center gap-6">
          <div className="">
            <div className="p-1 rounded-lg text-center">
              {image && (
                <Image
                  className="rounded-lg mb-2"
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
                <span className="block border-2 border-gray-300 cursor-pointer font-semibold py-2 px-8 rounded-lg">
                  Edit
                </span>
              </label>
              {/* <button type="button">Edit</button> */}
            </div>
          </div>

          <form className="grow" onSubmit={handleProfileInfoUpdate}>
            <input
              type="text"
              placeholder="First and last name"
              value={`${userName}`}
              onChange={(ev) => setUserName(ev.target.value)}
            />
            <input type="email" value={`${userEmail}`} disabled />
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </section>
  );
}
