"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv").config();
const MONGODB_URI = process.env.MONGOOSE_URI;
// const MONGODB_URI: string = "mongodb://localhost/Bag";
mongoose_1.default.connect(MONGODB_URI);
mongoose_1.default.connection
    .on("open", () => {
    console.log("Database Connected😏");
})
    .once("error", (error) => {
    console.log(`Error Connecting to DataBase \t ${error}`);
});
exports.default = mongoose_1.default;
