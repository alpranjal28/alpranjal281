"use client";
import { useState } from "react";
import EditableImage from "./EditableImage";
import toast from "react-hot-toast";

interface User {
  _id?: string;
  userName: string;
  userEmail: string;
  phone: number;
  address: string;
  city: string;
  postalCode: number;
  country: string;
  image: string;
}

export default function UserForm({ user }: { user: User}) {
  const [userName, setUserName] = useState<string>(user?.userName || "");
  const [userEmail, setUserEmail] = useState<string>(user?.userEmail || "");
  const [phone, setPhone] = useState<number>(user?.phone);
  const [address, setAddress] = useState<string>(user?.address || "");
  const [city, setCity] = useState<string>(user?.city || "");
  const [postalCode, setPostalCode] = useState<number>(user?.postalCode);
  const [country, setCountry] = useState<string>(user?.country || "");
  const [image, setImage] = useState<string>(user?.image || "");

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

  return (
    <div className="flex justify-center gap-6">
      <div className="">
        <div className="p-1 rounded-lg text-center">
          <EditableImage link={image} setLink={setImage} />
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
  );
}
