"use client";
import useProfile from "@/components/UseProfile";
import Loading from "@/components/layout/Loading";
import UserTabs from "@/components/layout/UserTabs";

export default function OrderPage() {
  const { loading, admin } = useProfile();

  if (loading) {
    return <Loading />;
  }
  if (!admin) {
    return <h1>You are not an admin</h1>;
  }
  return (
    <section className="mt-8">
      <UserTabs isAdmin={admin} />
      <div className=" max-w-2xl mx-auto">
        <h1 className="text-xl font-bold text-center">No orders yet</h1>
      </div>
      <div className="text-center text-xl font-medium mb-4">
        <h2>Maybe order me an interview ?</h2>
      </div>
      {/* CONTACT CARD with instagram, github and linkedin*/}
      <div className="flex flex-col items-center justify-center mt-8 gap-6">
        <a
          href="https://github.com/alpranjal28"
          target="_blank"
          rel="noreferrer"
        >
          <img src="/github-mark.png" alt="github" className="w-20 h-20" />
        </a>
        <a
          href="www.linkedin.com/in/pranjal-altherius-lakra"
          target="_blank"
          rel="noreferrer"
        >
          <img src="/linkedin.png" alt="linkedin" className="w-20 h-20" />
        </a>
      </div>
    </section>
  );
}
