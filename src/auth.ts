import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "./utils/db"
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
  theme: {
    logo: "/logo.svg"
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    Google
  ],
})