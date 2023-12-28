import createSupabaseServerClient from "@/lib/supabase/server";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";

export const AuthLogoutButton = () => {
	const logout = async () => {
		"use server";
		const supabase = await createSupabaseServerClient();
		await supabase.auth.signOut();
		redirect("/auth");
	};

	return (
		<form action={logout} className="space-y-8">
			<Button className="w-full bg-rose-900 hover:bg-rose-900/80">
				log out
			</Button>
		</form>
	);
};
