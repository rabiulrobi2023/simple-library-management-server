import { NextFunction, Request, Response } from "express";
import { Books } from "../model/book.model";
import { Borrow } from "../model/borrowBook.model";
import express from "express";
import sendResponse from "../../response/response";

export const borrowBookRouter = express.Router();

//===========================Create Borrow=============================
borrowBookRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const borrowBookData = req.body;
      const bookId = borrowBookData.book;
      const book = await Books.findById(bookId);
      const availableCopies = Number(book?.copies);
      const requirdCopies = Number(borrowBookData.quantity);
      const remaining = availableCopies - requirdCopies;

      if (remaining < 0) {
        res.status(400).json({
          message: "Copies not available",
        });
        return;
      }

      const result = await Borrow.create(borrowBookData);

      Books.bookStoreStatusChange(bookId);

      sendResponse(res, "Books borrwed successfully", result);
    } catch (error: any) {
      next(error);
    }
  }
);

//===========================Get Borrow=============================

borrowBookRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await Borrow.aggregate([
        {
          $group: {
            _id: "$book",
            totalQuantity: { $sum: "$quantity" },
            book: { $push: "$book" },
          },
        },
        {
          $lookup: {
            from: "books",
            localField: "book",
            foreignField: "_id",
            as: "book",
          },
        },
      ]).project({ _id: 0, "book.title": 1, "book.isbn": 1, totalQuantity: 1 });

      sendResponse(
        res,
        "Borrowed books summary retrieved successfully",
        result
      );
    } catch (error) {
      next(error);
    }
  }
);
