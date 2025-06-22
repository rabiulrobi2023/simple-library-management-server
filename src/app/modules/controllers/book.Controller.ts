import { Request, Response, Router } from "express";
import { Books } from "../model/book.model";

export const booksRouter = Router();

booksRouter.post("/", async (req: Request, res: Response) => {
  try {
    const bookData = req.body;
    console.log(bookData);
    const result = await Books.create(bookData);
    res.status(200).json({
      success: true,
      message: "Book created successfully",
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

booksRouter.get("/", async (req: Request, res: Response) => {
  try {
    const filter = req.query?.filter;
    const sortBy = req.query?.sortBy;
    const sort = req.query?.sort;
    const limit:number = Number(req.query.limit)||10

    const sortOption: any = sortBy
      ? { [sortBy as string]: sort === "desc" ? -1 : 1 }
      : { title: 1 };

    const result = await Books.find(filter ? { genre: filter } : {}).sort(
      sortOption
    ).limit(limit);

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
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
