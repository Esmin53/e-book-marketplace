import { Schema, model, models } from "mongoose";

const OrderSchema = new Schema({
    userId: { type: String, required: true },
    books: [{
      bookId: { type: String, required: true },
      price: Number,
      purchasedAt: { type: Date, default: Date.now }
    }],
    totalAmount: { type: Number, required: true },
    status: { type: String, default: 'completed' }
  });

  const Order = models.Order || model("Order", OrderSchema);
  export default Order;