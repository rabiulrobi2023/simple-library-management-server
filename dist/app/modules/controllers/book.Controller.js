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
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRouter = void 0;
const express_1 = require("express");
const book_model_1 = require("../model/book.model");
exports.booksRouter = (0, express_1.Router)();
//===========================Create Book=============================
exports.booksRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookData = req.body;
        console.log(bookData);
        const result = yield book_model_1.Books.create(bookData);
        res.status(200).json({
            success: true,
            message: "Book created successfully",
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
//===========================Get All Book=============================
exports.booksRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const filter = (_a = req.query) === null || _a === void 0 ? void 0 : _a.filter;
        const sortBy = (_b = req.query) === null || _b === void 0 ? void 0 : _b.sortBy;
        const sort = (_c = req.query) === null || _c === void 0 ? void 0 : _c.sort;
        const limit = Number(req.query.limit) || 10;
        const sortOption = sortBy
            ? { [sortBy]: sort === "desc" ? -1 : 1 }
            : { title: 1 };
        const result = yield book_model_1.Books.find(filter ? { genre: filter } : {})
            .sort(sortOption)
            .limit(limit);
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
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
//===========================Get Single Book=============================
exports.booksRouter.get("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.bookId;
        const result = yield book_model_1.Books.findById(id);
        if (result) {
            res.status(200).json({
                success: true,
                message: "Book retrieved successfully",
                data: result,
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: "The book is unavailable now",
                data: null,
            });
        }
    }
    catch (error) {
        res.status(400).json({
            message: error === null || error === void 0 ? void 0 : error.name,
            success: false,
            error: error.errors,
        });
    }
}));
//===========================Update A Book=============================
exports.booksRouter.put("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.bookId;
        const updateData = req.body;
        const result = yield book_model_1.Books.findByIdAndUpdate(id, updateData, { new: true });
        res.status(200).json({
            success: true,
            message: "Book updated successfully",
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
//===========================Delete A Book=============================
exports.booksRouter.delete("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.bookId;
        const updateData = req.body;
        const result = yield book_model_1.Books.findByIdAndDelete(id, updateData);
        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: null,
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
