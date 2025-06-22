import { model, Schema } from "mongoose";
import { IBookRegistration } from "../interface/book.interface";

const bookRegSchema = new Schema<IBookRegistration>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Author name is required"],
      trim: true,
    },
    genre: {
      type: String,
      enum: [
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
      ],
      required: [true, "Genre is required"],
      trim: true,
    },
    isbn: {
      type: String,
      required: [true, "ISBN number is required"],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
    },
    copies: {
      type: Number,
      required: [true, "Number of copies is required"],
      min: [1, `Minimum copi must be 1, but you entired {VALUE}`],
    },
    abailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Books = model<IBookRegistration>("books", bookRegSchema);
