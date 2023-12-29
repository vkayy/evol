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
      <Button variant="border" onClick={login} className="w-96">
        sign in with google
      </Button>
  )
}