"use client";
import { SetStateAction, useState } from "react";
import EditableImage from "./EditableImage";
import useProfile from "../UseProfile";
import AddressInputs from "./AddressInputs";
import Link from "next/link";
import Left from "../icons/Left";

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

  function handleAddressChange(
    propName: string,
    value: React.SetStateAction<any>
  ) {
    if (propName === "phone") {
      setPhone(value);
    }
    if (propName === "address") {
      setAddress(value);
    }
    if (propName === "city") {
      setCity(value);
    }
    if (propName === "postalCode") {
      setPostalCode(value);
    }
    if (propName === "country") {
      setCountry(value);
    }
  }

  return (
    <div className="md:flex justify-center gap-6">
      <div className="">
        <Link className="button" href={"/users"}>
          <Left /> Show all users
        </Link>
      </div>
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
          autoComplete="true"
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={user.email}
          placeholder="email"
          autoComplete="off"
          disabled
        />
        <AddressInputs
          addressProps={{
            phone,
            address,
            city,
            postalCode,
            country,
          }}
          setAddressProps={handleAddressChange}
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
                disabled
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
