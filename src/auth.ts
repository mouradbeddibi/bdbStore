import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import prisma from "./utils/db"
import Google from "next-auth/providers/google"
export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Google,
    ],
    callbacks: {
        session({ session, user }) {
            session.user.userRole = user.role
            return session
        }
    },


})