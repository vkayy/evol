"use client";

import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FileUpload } from "@/components/file-upload";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { useEffect } from "react";

const formSchema = z.object({
	name: z.string().min(1, {
		message: "server name is required",
	}),
	imageUrl: z.string().min(1, {
		message: "server image is required",
	}),
});

export const EditProfileModal = () => {
	const { isOpen, onClose, type, data } = useModal();
	const router = useRouter();

	const isModalOpen = isOpen && type === "editProfile";

	const { profile } = data;

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			imageUrl: "",
		},
	});

	useEffect(() => {
		if (profile) {
			form.setValue("name", profile?.name || "");
			form.setValue("imageUrl", profile?.imageUrl || "");
		}
	}, [profile, form, isOpen]);

	const isLoading = form.formState.isSubmitting;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			await axios.patch(`/api/profiles/${profile?.id}`, values);

			form.reset();
			router.refresh();
			onClose();
		} catch (error) {
			console.log(error);
		}
	};

	const handleClose = () => {
		form.reset();
		onClose();
	};

	return (
		<Dialog open={isModalOpen} onOpenChange={handleClose}>
			<DialogContent className="bg-white text-rose-900 p-0 overflow-hidden">
				<DialogHeader className="pt-8 px-6">
					<DialogTitle className="text-2xl text-center font-bold">
						edit your profile
					</DialogTitle>
					<DialogDescription className="text-center text-zinc-500 pb-2">
						feel free to use a nickname and get creative with your profile
						picture!
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<div className="space-y-4 px-6">
							<div className="flex items-center justify-center text-center">
								<FormField
									control={form.control}
									name="imageUrl"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<FileUpload
													endpoint="profilePicture"
													value={field.value}
													onChange={field.onChange}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
							</div>

							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>display name</FormLabel>
										<FormControl>
											<Input
												disabled={isLoading}
												className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
												placeholder="enter display name"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							></FormField>
						</div>
						<DialogFooter className="bg-gray-100 px-6 py-4">
							<Button variant="primary" disabled={isLoading}>
								save
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default EditProfileModal;
