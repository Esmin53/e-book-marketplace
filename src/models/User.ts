import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  name: String,
  email: String,
  image: String,
  role: {
    type: String,
    default: "user", 
  },
  library: [{
    bookId: { type: Schema.Types.ObjectId, ref: 'Book' },
    purchasedAt: { type: Date, default: Date.now }
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = models.User || model("User", UserSchema);
export default User;