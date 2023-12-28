"use server"

import createSupabaseServerClient from "../supabase/server"

export const currentSession = async () => {
  const supabase = await createSupabaseServerClient()
  return supabase.auth.getSession()
}

export const currentUser = async () => {
  const supabase = await createSupabaseServerClient()
  return supabase.auth.getUser()
}