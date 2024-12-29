import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { NextAuthOptions, Session } from "next-auth";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import client from "./db";
import { JWT } from "next-auth/jwt";
import { User } from "next-auth";


export const authOptions: NextAuthOptions = {
    //@ts-ignore
    adapter: MongoDBAdapter(client),
    session: {
        strategy: 'jwt'
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            profile(profile: GoogleProfile) {
                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.image,
                    role: 'user'
                }
            },
            httpOptions: {
              timeout: 40000,
            },
        })
    ],
    secret: process.env.JWT_SECRET,
    pages: {
        signIn: '/log-in'
    },
    callbacks: {
        async jwt({ token, user }) {

            if (user) {
                token.id = user.id;
                token.role = user.role || "user"; 
            }
          
            return token;
        },
        async session({session, user, token}: {session: Session, user: User, token: JWT}) {

            session.user.id = token.sub as string
            session.user.role = token.role as string

            return session
        },
    }
}