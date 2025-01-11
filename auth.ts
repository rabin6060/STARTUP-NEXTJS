import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { client } from "./sanity/lib/client"
import { STARTUP_QUERIES } from "./sanity/lib/queries"
import { writeClient } from "./sanity/lib/write-client"


 
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks:{
    async signIn({user:{name,email,image},profile}){
      const existingUser = await client.fetch(STARTUP_QUERIES.fetchUser,{id:profile?.id})
      if (!existingUser) {
        await writeClient.create({
          _type:'author',
          id:profile?.id,
          name,
          email,
          image,
          username:profile?.login,
          bio:profile?.bio || ""
        })
      }
      return true
    },
    async jwt({account,profile,token}){
      if (account && profile) {
        const user = await client.fetch(STARTUP_QUERIES.fetchUser,{id:profile?.id})
        if(user)
         token.id = user._id
      }
      return token
    },
    async session({session,token}){
      Object.assign(session,{id:token.id})
      return session
    }
  }
 
})