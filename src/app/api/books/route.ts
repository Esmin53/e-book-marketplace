import { connectDB } from "@/lib/dbConnect";
import Book from "@/models/Book";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
    try {

        await connectDB();

        const limit = Number(req.nextUrl.searchParams.get("limit")) || 6;
        const category = req.nextUrl.searchParams.get('category')
        

        const filter: any = {}

        if(category) {
            filter.genres = { $in: [category]}
        }

        const books = await Book.find(filter, '_id title author price cover_image').limit(limit)
        

        return new NextResponse(JSON.stringify(books), { status: 200 });
    } catch (error: any) {
        console.error("Error: ", error);


        return new NextResponse(
            JSON.stringify({ message: "Something went wrong", error: error.message }),
            { status: 500 }
        );
    }
};