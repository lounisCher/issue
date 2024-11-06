import NextAuth from "next-auth"
import authOptions from "./auth/authOptions"


export const { handlers, signIn, signOut, auth } = NextAuth(authOptions)