import AuthTabs from "@/components/auth/auth-tabs";
import { currentSession } from "@/lib/actions";
import { redirect } from "next/navigation";

const AuthPage = async () => {
	const {
		data: { session },
	} = await currentSession();

	if (session) {
		return redirect("/dashboard");
	}

	return (
		<div className="flex flex-col justify-center items-center h-full w-full">
			<AuthTabs />
		</div>
	);
};

export default AuthPage;
