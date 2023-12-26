import { PrismaClient }  from "@prisma/client"

declare global {
  var prismadb: PrismaClient | undefined
}

export const db = global.prismadb || new PrismaClient()

if (process.env.NODE_ENV !== "production") {
  global.prismadb = db
}