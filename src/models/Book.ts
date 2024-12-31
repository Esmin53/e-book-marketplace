import { Schema, model, models } from "mongoose";

const BookSchema = new Schema({
    title: {
        type: String,
        unique: [true, 'That book is already in the database'],
        required: [true, "Title is required"],
        trim: true,   
        minlength: [3, "Title must be at least 3 characters"],
        maxlength: [100, "Title cannot exceed 100 characters"],
    },
    author: {
        type: String,
        required: [true, "Author is required"],
        trim: true,
      },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price must be a positive number"],
      },
      genres: {
        type: [String],
        required: [true, "At least one genre is required"],
        enum: {
          values: [
            "Action & Adventure",
            "Bios & History",
            "Children's",
            "Fantasy",
            "Historical Fiction",
            "Horror",
            "Literary Fiction",
            "Mystery & Thriller",
            "Non-Fiction",
            "Romance",
            "Science Fiction",
            "Young Adult",
          ],
          message: "Invalid genre",
        },
      },
    file_url: {
        type: String,
        required: [true, "File URL is required"],
      },
    cover_image: {
        type: String,
        required: [true, "File URL is required"],
      }
}, {
    timestamps: true
});

const Book = models.Book || model("Book", BookSchema);
export default Book;