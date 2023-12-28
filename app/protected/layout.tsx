import { readUserSession } from "@/lib/actions";
import { redirect } from "next/navigation";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
	const { data } = await readUserSession();

	if (!data.session) {
		return redirect("/auth");
	}

	return <main>{children}</main>;
};

export default MainLayout;
