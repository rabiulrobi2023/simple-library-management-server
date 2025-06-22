import { Request, Response } from "express";
import { Books } from "../model/book.model";
import { Borrow } from "../model/borrowBook.model";
import express from "express";

const borrowBookRouter = express.Router();

borrowBookRouter.post("/", async (req: Request, res: Response) => {
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
    }
    Borrow.storeStatus(bookId, remaining);

    const result = await Borrow.create(borrowBookData);

    if (result) {
      await Books.findByIdAndUpdate(bookId, {
        copies: availableCopies - requirdCopies,
      });
    }

    res.status(200).json({
      success: true,
      message: "Books borrwed successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error?.name,
      success: false,
      error: error.errors,
    });
  }
});

export default borrowBookRouter;
