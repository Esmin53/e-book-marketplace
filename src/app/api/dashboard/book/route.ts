import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/dbConnect";
import { BookValidator } from "@/lib/validators/book-validator";
import Book from "@/models/Book";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
    try {
        const session = await getServerSession(authOptions)

        if(!session || session.user.role !== 'admin') {
            return new NextResponse(JSON.stringify('Unauthorized!'), { status: 401 });
        }

        await connectDB();

        const body = await req.json();

        const { title, price, author, genres, cover_image, file_url } = BookValidator.parse(body);

        const newBook = new Book({
            title,
            price,
            author,
            genres,
            cover_image,
            file_url,
        });

        const savedBook = await newBook.save();

        console.log(savedBook)

        return new NextResponse(JSON.stringify("Book saved successfully"), { status: 200 });
    } catch (error: any) {
        console.error("Error: ", error);

        if (error.code === 11000) {
            return new NextResponse(JSON.stringify({ message: "That book already exists in the database" }), {
                status: 400,
            });
        }

        if (error.name === "ValidationError") {
            return new NextResponse(
                JSON.stringify({
                    message: "Validation Error",
                    errors: error.errors,
                }),
                { status: 422 }
            );
        }

        return new NextResponse(
            JSON.stringify({ message: "Something went wrong", error: error.message }),
            { status: 500 }
        );
    }
};