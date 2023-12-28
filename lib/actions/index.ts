"use server"

import { cookies } from "next/headers"
import createSupabaseServerClient from "../supabase/server"

export const readUserSession = async () => {
  const cookieStore = cookies()
  const supabase = await createSupabaseServerClient()
  return supabase.auth.getSession()
}
