"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productDetailModel = new mongoose_1.default.Schema({
    productName: {
        type: String,
    },
    productDesription1: {
        type: String,
    },
    productDesription2: {
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
    descAvatar: {
        type: String,
    },
    descAvatarID: {
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
});
exports.default = mongoose_1.default.model("productDetail", productDetailModel);
