import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/dbConnect";
import Book from "@/models/Book";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
    try {
        const session = await getServerSession(authOptions)

        if(!session || session.user.role !== 'admin') {
            return new NextResponse(JSON.stringify('Unauthorized!'), { status: 401 });
        }

        await connectDB();

        const q = req.nextUrl.searchParams.get("q") || "";
        const page = Number(req.nextUrl.searchParams.get("page")) || 0;

        const LIMIT = 50

        const filter = q
            ? {
            $or: [
                { title: { $regex: q, $options: "i" } },
                { author: { $regex: q, $options: "i" } }
                ]
            }
        : {};

        const books = await Book.find(filter, '_id title author price').limit(LIMIT).skip(page * LIMIT)


        console.log(books)
        

        return new NextResponse(JSON.stringify(books), { status: 200 });
    } catch (error: any) {
        console.error("Error: ", error);


        return new NextResponse(
            JSON.stringify({ message: "Something went wrong", error: error.message }),
            { status: 500 }
        );
    }
};