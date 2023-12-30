import { AuthLogoutButton } from "@/components/auth/auth-logout-button";
import { CustomiseProfileButton } from "@/components/profile/customise-profile-button";
import { currentProfile } from "@/lib/actions";
import Link from "next/link";
import { redirect } from "next/navigation";

const ProtectedPage = async () => {
	const profile = await currentProfile();

	if (!profile) {
		return redirect("/auth");
	}

	return (
		<div className="flex flex-col justify-center items-center h-full">
			<div className="flex">
				<div className="flex flex-col justify-center items-center">
					<h1 className="pt-2 text-4xl font-bold text-rose-900">evol.</h1>
					<Link
						href="/"
						className="text-rose-900 text-center mt-2 relative after:bg-rose-900 after:absolute
								after:h-0.5 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all"
					>
						home
					</Link>
				</div>
			</div>
			<div className="h-full w-full flex flex-col justify-center items-center">
				<h2 className="text-lg p-6">
					welcome back{profile?.name ? `, ${profile?.name}!` : "!"} :&#41;
				</h2>
				{(!profile?.name || !profile?.imageUrl) && (
					<p className="text-sm text-stone-500">p.s. don't forget to customise your profile!</p>
				)}
				<AuthLogoutButton />
			</div>
			<div className="absolute bottom-4 left-4">
				<CustomiseProfileButton profile={profile} size={12} />
			</div>
		</div>
	);
};

export default ProtectedPage;
