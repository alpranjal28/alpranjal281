"use client"
import useProfile from "@/components/UseProfile";
import Loading from "@/components/layout/Loading";
import UserTabs from "@/components/layout/UserTabs";

export default function EditUser() {

	const {loading,data}=useProfile()


	if (loading) return <Loading />;
  if (!data) {
    return <h1>You are not an admin</h1>;
  }
  
  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={true} />
			<div className="mt-8">
				user info form
			</div>
    </section>
  );
}
