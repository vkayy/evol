"use client";

import { useState, useEffect } from "react";

import CreateProfileModal from "@/components/modals/create-profile-modal";
import EditProfileModal from "@/components/modals/edit-profile-modal";

export const ModalProvider = () => {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) return null;
	return (
		<>
			<CreateProfileModal />
			<EditProfileModal />
		</>
	);
};
