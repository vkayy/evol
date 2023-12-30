"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuthLoginForm } from "./auth-login-form";
import { AuthRegisterForm } from "./auth-register-form";

const AuthTabs = () => {
	return (
		<Tabs defaultValue="login" className="w-96 mx-8">
			<TabsList className="grid w-full grid-cols-2">
				<TabsTrigger value="login" className="text-stone-500">login</TabsTrigger>
				<TabsTrigger value="register" className="text-stone-500">register</TabsTrigger>
			</TabsList>
			<TabsContent value="login">
				<AuthLoginForm />
			</TabsContent>
			<TabsContent value="register">
				<AuthRegisterForm />
			</TabsContent>
		</Tabs>
	);
};

export default AuthTabs;
