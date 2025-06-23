import { NextFunction, Request, Response, Router } from "express";
import { Books } from "../model/book.model";
import express from "express";
import sendResponse from "../../response/response";

export const booksRouter = express.Router();

//===========================Create Book=============================
booksRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookData = req.body;
      const result = await Books.create(bookData);
      sendResponse(res, "Book created successfully", result);
    } catch (error: any) {
      next(error);
    }
  }
);

//===========================Get All Book=============================
booksRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const filter = req.query?.filter;
      const sortBy = req.query?.sortBy;
      const sort = req.query?.sort;
      const limit: number = Number(req.query.limit) || 10;

      const sortOption: any = sortBy
        ? { [sortBy as string]: sort === "desc" ? -1 : 1 }
        : { title: 1 };

      const result = await Books.find(filter ? { genre: filter } : {})
        .sort(sortOption)
        .limit(limit);

      sendResponse(res, "Books retrieved successfully", result);
    } catch (error: any) {
      next(error);
    }
  }
);

//===========================Get Single Book=============================
booksRouter.get(
  "/:bookId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.bookId;
      const result = await Books.findById(id);
      if (result) {
        sendResponse(res, "Book retrieved successfully", result);
      } else {
        res.status(404).json({
          success: false,
          message: "The book is unavailable now",
          data: null,
        });
      }
    } catch (error: any) {
      next(error);
    }
  }
);

//===========================Update A Book=============================
booksRouter.put(
  "/:bookId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.bookId;
      const updateData = req.body;
      const result = await Books.findByIdAndUpdate(id, updateData, {
        new: true,
      });
      sendResponse(res, "Book updated successfully", result);
    } catch (error: any) {
      next(error);
    }
  }
);

//===========================Delete A Book=============================
booksRouter.delete(
  "/:bookId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.bookId;
      const updateData = req.body;
      const result = await Books.findByIdAndDelete(id, updateData);
      sendResponse(res, "Book deleted successfully", result);
    } catch (error: any) {
      next(error);
    }
  }
);
