"use client"


import { Button } from "../ui/button";
import createSupabaseClientClient from "@/lib/supabase/client";

export const AuthGoogleButton = () => {
  const supabase = createSupabaseClientClient();
  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`
      }
    })
  }
  return (
      <Button onClick={login} className="bg-white text-rose-900 w-96 border border-rose-900 hover:bg-rose-900/10">
        sign in with google
      </Button>
  )
}