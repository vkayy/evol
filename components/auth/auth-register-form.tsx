"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { useToast } from "@/components/ui/use-toast";
import { signUpWithEmailAndPassword } from "@/app/(auth)/auth/actions";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { currentProfile, userExists } from "@/lib/actions";

const formSchema = z
	.object({
		email: z.string().email({
			message: "invalid email address",
		}),
		password: z.string().min(8, {
			message: "password must be at least 8 characters long",
		}),
		confirm: z.string(),
	})
	.refine((data) => data.password === data.confirm, {
		message: "passwords do not match",
		path: ["confirm"],
	});

export const AuthRegisterForm = () => {
	const { onOpen } = useModal();
	const { toast } = useToast();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
			confirm: "",
		},
	});

	const isLoading = form.formState.isSubmitting;

	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		const exists = await userExists(data.email);
		const result = await signUpWithEmailAndPassword(data);

		const { error } = JSON.parse(result);

		let message = "";

		if (error) {
			message = error.message;
		}

		if (exists) {
			message = "email already in use";
		}

		if (error || exists) {
			if (message[message.length - 1] === ".") {
				message = message.slice(0, -1);
			}
			toast({
				variant: "destructive",
				title: "uh oh.",
				description: `${message}!`.toLocaleLowerCase(),
			});
		} else {
			const profile = await currentProfile();

			if (!!profile) {
				onOpen("createProfile", { profile });
				toast({
					title: "success!",
					description: "check your email to verify!",
				});
			} else {
				toast({
					variant: "destructive",
					title: "uh oh.",
					description: "something went wrong!".toLocaleLowerCase(),
				});
			}
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>email</FormLabel>
							<FormControl>
								<Input
									placeholder="enter your email"
									{...field}
									disabled={isLoading}
								/>
							</FormControl>
							<FormMessage className="lowercase" />
						</FormItem>
					)}
				></FormField>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>password</FormLabel>
							<FormControl>
								<Input
									placeholder="enter your password"
									{...field}
									type="password"
									disabled={isLoading}
								/>
							</FormControl>
							<FormMessage className="lowercase" />
						</FormItem>
					)}
				></FormField>
				<FormField
					control={form.control}
					name="confirm"
					render={({ field }) => (
						<FormItem>
							<FormLabel>confirm password</FormLabel>
							<FormControl>
								<Input
									placeholder="confirm your password"
									{...field}
									type="password"
									disabled={isLoading}
								/>
							</FormControl>
							<FormMessage className="lowercase" />
						</FormItem>
					)}
				></FormField>
				<Button
					variant="primary"
					type="submit"
					className="w-full"
					disabled={isLoading}
				>
					sign up
				</Button>
			</form>
		</Form>
	);
};
