"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_Controller_1 = require("./app/modules/controllers/book.Controller");
const borrow_controller_1 = __importDefault(require("./app/modules/controllers/borrow.controller"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/books", book_Controller_1.booksRouter);
app.use("/api/borrow", borrow_controller_1.default);
app.get("/", (req, res) => {
    res.send("Library Management App is Running");
});
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: "API not found"
    });
});
exports.default = app;
