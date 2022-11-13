"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const productRouter_1 = __importDefault(require("./router/productRouter"));
const detailRouter_1 = __importDefault(require("./router/detailRouter"));
const orderRouter_1 = __importDefault(require("./router/orderRouter"));
require("./config/db");
require("dotenv").config();
const PORT = process.env.PORT || 3002;
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: "*" }));
app.set("view engine", "ejs");
app.use(express_1.default.json());
app.get("/", (req, res) => {
    return res.status(200).json("message: Server Up 🚀🚀🚀");
});
app.get("/home", (req, res) => {
    return res.render("mail");
});
app.use("/api/products", productRouter_1.default);
app.use("/api/detail", detailRouter_1.default);
app.use("/api/order", orderRouter_1.default);
app.listen(PORT, () => {
    console.log(`Listening on PORT.: ${PORT}`);
});
