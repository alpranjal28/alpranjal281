"use client";
import useProfile from "@/components/UseProfile";
import Loading from "@/components/layout/Loading";
import UserTabs from "@/components/layout/UserTabs";
import { useEffect, useState } from "react";

export default function UsersPage() {
  const { loading, data } = useProfile();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((users) => setUsers(users));
  }, []);

  if (loading) {
    return <Loading />;
  }
  if (!data) {
    return <h1>You are not an admin</h1>;
  }

  return (
    <section className="max-w-2xl mt-8 mb-4 mx-auto">
      <UserTabs isAdmin={true} />

      <div className=" mt-8">
        {users?.length > 0 &&
          users.map((user) => (
            <div
              className="bg-gray-200 rounded-lg mb-2 items-center p-4 gap-4"
              key={user[`_id`]}
            >
              <div className="">
                <span>{[user[`name`]]}</span>
                <span>{[user[`email`]]}</span>
              </div>
              <div className="">
                <button >Edit</button>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
