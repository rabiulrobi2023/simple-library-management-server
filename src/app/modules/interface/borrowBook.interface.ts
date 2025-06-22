import { Model, Types } from "mongoose";

export interface IBorrowBook {
  book: Types.ObjectId;
  quantity: number;
  dueDate: Date;
}

export interface IBorrowBookStatic extends Model<IBorrowBook> {
  storeStatus(id: string, store: number): null;
}
