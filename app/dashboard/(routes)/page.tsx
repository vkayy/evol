import { AuthLogoutButton } from "@/components/auth/auth-logout-button";
import { readUserSession } from "@/lib/actions";
import Link from "next/link";
import { redirect } from "next/navigation";

const ProtectedPage = async () => {
  const { data } = await readUserSession();

  if (!data.session) {
    return redirect("/auth");
  }

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
        <h2 className="text-lg p-6">you made it!</h2>
        <AuthLogoutButton />
      </div>
    </div>
   );
}
 
export default ProtectedPage;