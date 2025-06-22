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

borrowBookSchema.static("storeStatus", async function (id, remaining) {
  console.log(id, remaining)
  if (remaining === 0) {
    await Books.findOneAndUpdate(id, { available: false });
  }
  return null;
});

export const Borrow = model<IBorrowBook, IBorrowBookStatic>("borrowed-book", borrowBookSchema);
