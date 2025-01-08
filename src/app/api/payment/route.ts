import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/dbConnect";
import { BookValidator } from "@/lib/validators/book-validator";
import Book from "@/models/Book";
import Order from "@/models/Order";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
    try {
        const session = await getServerSession(authOptions)

        if(!session) {
            return new NextResponse(JSON.stringify('Unauthorized!'), { status: 401 });
        }

        await connectDB();

        const {books, total}: {
            total: number
            books: {
                book: {
                _id: string,
                price: number
            }}[]
        } = await req.json();

        console.log("Boooooks: ", total)

        const newOrderedBooks = books.map((item) => ({
            bookId: item.book._id,
            price: item.book.price,
            purchasedAt: new Date()
        }))


        const newOrder = new Order({
            userId: session.user.id,
            books: newOrderedBooks,
            totalAmount: total
        });

        const savedOrder = await newOrder.save();

        await User.findByIdAndUpdate(
            session.user.id,
            {
              $addToSet: {
                library: {
                  $each: newOrderedBooks.map(item => ({ bookId: item.bookId }))
                }
              }
            }
          );

        return new NextResponse(JSON.stringify("OKi"), { status: 200 });
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