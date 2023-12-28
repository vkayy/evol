"use server"

import createSupabaseServerClient from "../supabase/server"

export const readUserSession = async () => {
  const supabase = await createSupabaseServerClient()
  return supabase.auth.getSession()
}
