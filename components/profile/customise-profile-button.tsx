"use client";

import { useModal } from "@/hooks/use-modal-store";
import { Button } from "../ui/button";
import { UserAvatar } from "../user-avatar";
import { Profile } from "@prisma/client";

interface CustomiseProfileButtonProps {
	profile: Profile;
	size: number;
}

export const CustomiseProfileButton = ({
	profile,
	size,
}: CustomiseProfileButtonProps) => {
	const { onOpen } = useModal();
	const buttonCn = `bg-transparent h-${size + 4} w-${size + 4} hover:bg-transparent rounded-full hover:border-rose-900 border-4`
	const avatarCn = `h-${size} w-${size} md:h-${size} md:w-${size}`;
	return (
		<Button
			onClick={() => {
				onOpen("editProfile", { profile });
			}}
			className={buttonCn}
		>
			{profile.imageUrl && (
				<UserAvatar
					className={avatarCn}
					src={profile.imageUrl}
				/>
			)}
			{!profile.imageUrl && (
				<UserAvatar
					className={avatarCn}
					fallback={profile.name || "?"}
				/>
			)}
		</Button>
	);
};
