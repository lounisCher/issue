import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/prisma/client"
import { NextAuthConfig } from "next-auth";
const authOptions: NextAuthConfig={
    session: {
        strategy: "jwt"
    },
    adapter: PrismaAdapter(prisma),
    providers: [
    Google({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
],

}
export default authOptions;