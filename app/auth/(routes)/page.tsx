import AuthTabs from "@/components/auth/auth-tabs";
import { readUserSession } from "@/lib/actions";
import { redirect } from "next/navigation";

export default async function Page() {
	const { data } = await readUserSession();
	console.log("data attribute of readUserSession:", data);

	if (data.session) {
		console.log("redirecting to /protected");
		return redirect("/protected");
	} else {
		console.log("no session found");
	}

	return (
		<div className="flex flex-col justify-center items-center h-full">
			<AuthTabs />
		</div>
	);
}
