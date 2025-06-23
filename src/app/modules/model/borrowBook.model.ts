import { model, Schema } from "mongoose";
import {
  IBorrowBook,
  IBorrowBookStatic,
} from "../interface/borrowBook.interface";
import { Books } from "./book.model";

const borrowBookSchema = new Schema<IBorrowBook, IBorrowBookStatic>(
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

borrowBookSchema.pre("save", async function (next) {
  const bookFromStore = await Books.findById(this.book);
  const available = bookFromStore?.copies;
  const remaining = Number(available) - this.quantity;
  await Books.findByIdAndUpdate({ _id: this.book }, { copies: remaining });
  next();
});

export const Borrow = model<IBorrowBook, IBorrowBookStatic>(
  "borrowed-book",
  borrowBookSchema
);
