import AuthTabs from "@/components/auth/auth-tabs";
import { readUserSession } from "@/lib/actions";
import { redirect } from "next/navigation";

const AuthPage = async () => {
	const { data } = await readUserSession();

	if (data.session) {
		return redirect("/hero");
	}

	return (
		<div className="flex flex-col justify-center items-center h-full">
			<AuthTabs />
		</div>
	);
}
 
export default AuthPage;
