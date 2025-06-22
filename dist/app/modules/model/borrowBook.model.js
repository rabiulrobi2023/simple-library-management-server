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
exports.Borrow = void 0;
const mongoose_1 = require("mongoose");
const book_model_1 = require("./book.model");
const borrowBookSchema = new mongoose_1.Schema({
    book: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "Book id is required"],
        ref: "books",
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        min: [1, "Book number must be atleast 1"],
    },
    dueDate: {
        type: Date,
        required: [true, "Date is required"],
    },
}, {
    timestamps: true,
});
borrowBookSchema.static("storeStatus", function (id, remaining) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(id, remaining);
        if (remaining === 0) {
            yield book_model_1.Books.findOneAndUpdate(id, { available: false });
        }
        return null;
    });
});
exports.Borrow = (0, mongoose_1.model)("borrowed-book", borrowBookSchema);
