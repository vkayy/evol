import { Profile } from "@prisma/client";
import { create } from "zustand";

export type ModalType = "createProfile";

interface ModalData {
	profile?: Profile;
}

interface ModalStore {
	type: ModalType | null;
	data: ModalData;
	isOpen: boolean;
	onOpen: (type: ModalType, data?: ModalData) => void;
	onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
	type: null,
	data: {},
	isOpen: false,
	onOpen: (type, data = {}) => set({ type, data, isOpen: true }),
	onClose: () => set({ type: null, isOpen: false }),
}));
