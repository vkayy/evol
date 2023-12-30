import AuthTabs from "@/components/auth/auth-tabs";
import { currentProfile, currentSession } from "@/lib/actions";
import { redirect } from "next/navigation";

const AuthPage = async () => {
	const profile = await currentProfile();

	if (profile) {
		return redirect("/dashboard");
	}

	return (
		<div className="flex flex-col justify-center items-center h-full w-full">
			<AuthTabs />
		</div>
	);
}
 
export default AuthPage;
