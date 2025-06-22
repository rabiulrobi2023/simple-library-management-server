"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const book_model_1 = require("../model/book.model");
const borrowBook_model_1 = require("../model/borrowBook.model");
const express_1 = __importDefault(require("express"));
const borrowBookRouter = express_1.default.Router();
borrowBookRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const borrowBookData = req.body;
        const bookId = borrowBookData.book;
        const book = yield book_model_1.Books.findById(bookId);
        const availableCopies = Number(book === null || book === void 0 ? void 0 : book.copies);
        const requirdCopies = Number(borrowBookData.quantity);
        const remaining = availableCopies - requirdCopies;
        if (remaining < 0) {
            res.status(400).json({
                message: "Copies not available",
            });
        }
        borrowBook_model_1.Borrow.storeStatus(bookId, remaining);
        const result = yield borrowBook_model_1.Borrow.create(borrowBookData);
        if (result) {
            yield book_model_1.Books.findByIdAndUpdate(bookId, {
                copies: availableCopies - requirdCopies,
            });
        }
        res.status(200).json({
            success: true,
            message: "Books borrwed successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(400).json({
            message: error === null || error === void 0 ? void 0 : error.name,
            success: false,
            error: error.errors,
        });
    }
}));
exports.default = borrowBookRouter;
