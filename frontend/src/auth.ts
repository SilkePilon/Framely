import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"

export const config = {
  providers: [GitHub],
  pages: {
    signIn: "/signin",
  },
}
 
export const { handlers, signIn, signOut, auth } = NextAuth(config)