import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import client from "./db";

export const authOptions: NextAuthOptions = {
    adapter: MongoDBAdapter(client),
    session: {
        strategy: 'jwt'
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            httpOptions: {
              timeout: 40000,
            },
        })
    ],
    secret: process.env.JWT_SECRET,
    pages: {
        signIn: '/log-in'
    },
}