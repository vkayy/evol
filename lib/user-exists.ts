"use server"

import { db } from "./db"

export const userExists = async (email: string) => {
  const user = await db.profile.findUnique({
    where: {
      email,
    }
  })

  return !!user
}