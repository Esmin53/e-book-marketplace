import { DefaultSession, DefaultUser } from "next-auth";

declare module 'next-auth' {

    interface User extends DefaultUser {
        role: string
        id: string
        library: {
            bookId: string,
            purchasedAt: Date
          }[]
    }

    interface Session extends DefaultSession {
        user: User
    }
}

