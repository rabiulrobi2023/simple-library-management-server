import express, { Application, NextFunction, Request, Response } from "express";
import { booksRouter } from "./app/modules/controllers/book.Controller";
import borrowBookRouter from "./app/modules/controllers/borrow.controller";



const app: Application = express();
app.use(express.json());

app.use("/api/books", booksRouter);
app.use("/api/borrow", borrowBookRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Library Management App is Running");
});


app.use((req:Request,res: Response, next: NextFunction)=>{
  res.status(404).json({
    success: false,
    message: "API not found"
  })
})

export default app;
