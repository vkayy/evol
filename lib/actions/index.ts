"use server"

import { db } from "../db"
import createSupabaseServerClient from "../supabase/server"

export const currentSession = async () => {
  const supabase = await createSupabaseServerClient()
  return supabase.auth.getSession()
}

export const currentUser = async () => {
  const supabase = await createSupabaseServerClient()
  return supabase.auth.getUser()
}

export const currentProfile = async () => {
	const {
		data: { user },
	} = await currentUser();

	const profile = await db.profile.findFirst({
		where: {
			id: user?.id,
		},
	});

  return profile
};

export const userExists = async (email: string) => {
  const user = await db.profile.findUnique({
    where: {
      email,
    }
  })

  return !!user
}