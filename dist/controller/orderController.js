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
exports.createOrder = exports.getOrders = void 0;
const email_1 = require("../email/email");
const orderModel_1 = __importDefault(require("../model/orderModel"));
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getOrder = yield orderModel_1.default.find();
        return res.status(200).json({
            message: "Data Gotten Sucessfully",
            data: getOrder,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "An Error Occoured",
            data: error,
        });
    }
});
exports.getOrders = getOrders;
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, address } = req.body;
        const newOrder = yield orderModel_1.default.create({
            name,
            email,
            address,
        });
        (0, email_1.recieveOrder)(email, name)
            .then((result) => {
            console.log("Mail Sent", result);
        })
            .catch((error) => {
            console.log(error);
        });
        return res.status(201).json({
            message: "Order Sent",
            data: newOrder,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "An Error Occoured",
            data: error,
        });
    }
});
exports.createOrder = createOrder;
