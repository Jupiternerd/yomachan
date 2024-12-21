import NextAuth from "next-auth"
import Discord from "next-auth/providers/discord"
import { env } from "process"
import { getUser, updateOrCreateUser } from "@/lib/queries/users"

const handler = NextAuth({
    providers: [
        Discord({
            clientId: env.DISCORD_ID as string,
            clientSecret: env.DISCORD_SECRET as string,
            authorization: {params: {scope: "identify email"}},
        })
    ],
    secret: env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    callbacks: {
        async jwt({ token, account, user }) {
            if (account && user) {
                const adminIds = process.env.DISCORD_ADMIN_IDS?.split(',') || [];
                const isAdmin = adminIds.includes(account.providerAccountId);
                
                await updateOrCreateUser(
                    user.id, 
                    user.name ?? "unknown", 
                    user.email || null, 
                    user.image || null, 
                    isAdmin
                );

                return {
                    ...token,
                    id: user.id,
                    isAdmin
                }
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.isAdmin = token.isAdmin;
            return session;
        }
    }
})

export { handler as GET, handler as POST }