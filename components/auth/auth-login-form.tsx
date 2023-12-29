"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { useToast } from "@/components/ui/use-toast";
import { signInWithEmailAndPassword } from "@/app/(auth)/auth/actions";
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
import { useRouter } from "next/navigation";
import { AuthGoogleButton } from "./auth-google-button";

const formSchema = z.object({
	email: z.string().email({
		message: "invalid email address",
	}),
	password: z.string().min(8, {
		message: "password must be at least 8 characters long",
	}),
});

export const AuthLoginForm = () => {
	const { toast } = useToast();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const isLoading = form.formState.isSubmitting;

	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		const result = await signInWithEmailAndPassword(data);

		const { error } = JSON.parse(result);

		if (error) {
			if (error.message[error.message.length - 1] === ".") {
				error.message = error.message.slice(0, -1);
			}
			toast({
				variant: "destructive",
				title: "uh oh.",
				description: `${error.message}!`.toLocaleLowerCase(),
			});
		} else {
			toast({
				title: "success!",
				description: "welcome back to evol!",
			});
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mb-6">
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
				<Button
					variant="primary"
					type="submit"
					className="w-full"
					disabled={isLoading}
				>
					sign in
				</Button>
				<AuthGoogleButton />
			</form>
		</Form>
	);
};
