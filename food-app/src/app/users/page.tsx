"use client";
import useProfile from "@/components/UseProfile";
import Loading from "@/components/layout/Loading";
import UserTabs from "@/components/layout/UserTabs";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function UsersPage() {
  const { loading, admin } = useProfile();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((users) => setUsers(users));
  }, []);
  
  if (loading) {
    return <Loading />;
  }
  if (!admin) {
    return <h1>You are not an admin</h1>;
  }

  return (
    <section className="max-w-2xl mt-8 mb-4 mx-auto">
      <UserTabs isAdmin={admin} />

      <div className=" mt-8">
        {users?.length > 0 &&
          users.map((user) => (
            <div
              className="bg-gray-200 rounded-lg flex mb-2 items-center p-4 gap-4"
              key={user[`_id`]}
            >
              <div className=" grid sm:grid-cols-2 md:grid-cols-3 sm:gap-4 grow">
                <span className="text-gray-900 font-medium">
                  {[user[`name`] || <i>No name</i>]}
                </span>
                <span className="text-gray-500">{[user[`email`]]}</span>
              </div>
              <div className="">
                <Link className="button" href={`/users/${user[`_id`]}`}>
                  Edit
                </Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
