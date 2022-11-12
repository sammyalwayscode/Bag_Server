"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productModel = new mongoose_1.default.Schema({
    productName: {
        type: String,
    },
    price: {
        type: Number,
    },
    avatar: {
        type: String,
    },
    avatarID: {
        type: String,
    },
    brandName: {
        type: String,
    },
    bagType: {
        type: String,
    },
    bagColor: {
        type: String,
    },
    productDetail: {
        type: [
            {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "productDetail",
            },
        ],
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Products", productModel);
