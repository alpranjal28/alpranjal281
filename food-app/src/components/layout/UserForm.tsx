"use client";
import { useState } from "react";
import EditableImage from "./EditableImage";
import useProfile from "../UseProfile";

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

export default function UserForm({
  user,
  onSave,
}: {
  user: User;
  onSave: (ev: any, data: any) => Promise<void>;
}) {
  const { data: loggedInUserData } = useProfile();
  const [userName, setUserName] = useState<string>(user?.name || "");
  const [userEmail, setUserEmail] = useState<string>(user?.email || "");
  const [phone, setPhone] = useState<number>(user?.phone);
  const [address, setAddress] = useState<string>(user?.address || "");
  const [city, setCity] = useState<string>(user?.city || "");
  const [postalCode, setPostalCode] = useState<number>(user?.postalCode);
  const [country, setCountry] = useState<string>(user?.country || "");
  const [image, setImage] = useState<string>(user?.image || "");
  const [admin, setAdmin] = useState<boolean>(user?.admin || false);

  return (
    <div className="flex justify-center gap-6">
      <div className="">
        <div className="p-1 rounded-lg text-center">
          <EditableImage link={image} setLink={setImage} />
        </div>
      </div>

      <form
        className="grow"
        onSubmit={(e) =>
          onSave(e, {
            name: userName,
            email: userEmail,
            phone,
            address,
            city,
            postalCode,
            country,
            image,
            admin,
          })
        }
      >
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
          value={user.email}
          placeholder="email"
          disabled
        />
        <label htmlFor="number">Phone number</label>
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
          <div className="grow">
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
        {/* ADMIN */}
        {loggedInUserData && (
          <div className="">
            <label
              htmlFor="adminCheckbox"
              className="p-2 font-semibold font inline-flex -top-1 gap-2 m-2"
            >
              <input
                type="checkbox"
                name=""
                id="adminCheckbox"
                checked={admin}
                onChange={(e) => setAdmin(!admin)}
                // onClick={(e) => setAdmin(!admin)}
              />
              <span>Admin</span>
            </label>
          </div>
        )}
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
