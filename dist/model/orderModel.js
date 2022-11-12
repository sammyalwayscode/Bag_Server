"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const orderModel = new mongoose_1.default.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    address: {
        type: String,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("orders", orderModel);
