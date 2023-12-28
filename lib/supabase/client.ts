"use client";

import { createBrowserClient } from "@supabase/ssr";

const createSupabaseClientClient = () => {
	return createBrowserClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
	);
};

export default createSupabaseClientClient;
