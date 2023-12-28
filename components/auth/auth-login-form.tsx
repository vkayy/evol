"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { useToast } from "@/components/ui/use-toast";
import {
	signInWithEmailAndPassword,
} from "@/app/auth/actions";
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

const formSchema = z.object({
	email: z.string().email({
		message: "invalid email address",
	}),
	password: z.string().min(8, {
		message: "password must be at least 8 characters long",
	}),
});

export const AuthLoginForm = () => {
	const router = useRouter();
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

		// const { error } = JSON.parse(result);

		// if (error) {
		// 	toast({
		// 		variant: "destructive",
		// 		title: "uh oh!",
		// 		description: error.message,
		// 	});
		// } else {
		toast({
			title: "you submitted these values:",
			description: (
				<pre className="mt-2 rounded-md bg-stone-950 p-4">
					<code className="text-white w-full">
						{JSON.stringify(data, null, 2)}
					</code>
				</pre>
			),
		});
		// }
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
							<FormMessage />
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
							<FormMessage />
						</FormItem>
					)}
				></FormField>
				<Button
					type="submit"
					className="w-full bg-rose-900 hover:hover:bg-rose-900/80"
					disabled={isLoading}
				>
					sign in
				</Button>
			</form>
		</Form>
	);
};
