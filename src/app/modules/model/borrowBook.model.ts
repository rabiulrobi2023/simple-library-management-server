import { model, Schema } from "mongoose";
import { IBorrowBook } from "../interface/borrowBook.interface";

const borrowBookSchema = new Schema<IBorrowBook>(
  {
    book: {
      type: Schema.Types.ObjectId,
      required: [true, "Book id is required"],
      ref: "books",
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Book number must be atleast 1"],
    },
    dueDate: {
      type: Date,
      required: [true, "Date is required"],
    },
  },
  {
    timestamps: true,
  }
);

export const Borrow = model<IBorrowBook>("borrowed-book", borrowBookSchema);
