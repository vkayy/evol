import axios from "axios";

import { AuthLogoutButton } from "@/components/auth/auth-logout-button";
import { currentSession } from "@/lib/actions";
import Link from "next/link";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

const ProtectedPage = async () => {
  const { data } = await currentSession();

  if (!data.session) {
    return redirect("/auth");
  }

  const id = data.session.user.id;

  console.log(id)

  const profile = await db.profile.findUnique({
    where: {
      id
    }
  })
  
  console.log(profile)

  return ( 
    <div className="flex flex-col justify-center items-center h-full">
      <h1 className="pt-2 text-4xl font-bold text-rose-900">evol.</h1>
      <Link
				href="/"
				className="text-rose-900 text-center mt-2 relative after:bg-rose-900 after:absolute
        after:h-0.5 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all"
			>
				home
			</Link>
      <div className="h-full w-full flex flex-col justify-center items-center">
        <h2 className="text-lg p-6">
          hello, {profile?.name || "friend"}
        </h2>
        <AuthLogoutButton />
      </div>
    </div>
   );
}
 
export default ProtectedPage;