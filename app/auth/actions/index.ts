"use server";

import createSupabaseServerClient from "@/lib/supabase/server";

export const signUpWithEmailAndPassword = async (data: {
	email: string;
	password: string;
	confirm: string;
}) => {
	const supabase = await createSupabaseServerClient();
	const result = await supabase.auth.signUp({
		email: data.email,
		password: data.password,
	});
	console.log(JSON.stringify(result));
	return JSON.stringify(result);
};

export const signInWithEmailAndPassword = async (data: {
	email: string;
	password: string;
}) => {};
