import { Model } from "mongoose";

export interface IBookRegistration {
  title: string;
  author: string;
  genre:
    | "FICTION"
    | "NON_FICTION"
    | "SCIENCE"
    | "HISTORY"
    | "BIOGRAPHY"
    | "FANTASY";

  isbn: string;
  description: string;
  copies: number;
  available: boolean;
}

export interface IBookStoreStatusStatic extends Model<IBookRegistration> {
  bookStoreStatusChange(id: string): null;
}
