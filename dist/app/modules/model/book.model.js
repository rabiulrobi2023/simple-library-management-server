"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Books = void 0;
const mongoose_1 = require("mongoose");
const bookRegSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
    },
    author: {
        type: String,
        required: [true, "Author name is required"],
        trim: true,
    },
    genre: {
        type: String,
        enum: [
            "FICTION",
            "NON_FICTION",
            "SCIENCE",
            "HISTORY",
            "BIOGRAPHY",
            "FANTASY",
        ],
        required: [true, "Genre is required"],
        trim: true,
    },
    isbn: {
        type: String,
        required: [true, "ISBN number is required"],
        unique: true,
        trim: true,
    },
    description: {
        type: String,
    },
    copies: {
        type: Number,
        required: [true, "Number of copies is required"],
        min: [1, `Minimum copi must be 1, but you entired {VALUE}`],
    },
    available: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});
exports.Books = (0, mongoose_1.model)("books", bookRegSchema);
