import express, { Application, Request, Response } from "express";
import productsRouter from "./router/productRouter";
import detailRouter from "./router/detailRouter";
import orderRouter from "./router/orderRouter";
require("./config/db");
require("dotenv").config();

const PORT = process.env.PORT || 3002;
const app: Application = express();

app.set("view engine", "ejs");
app.use(express.json());
app.get("/", (req: Request, res: Response): Response => {
  return res.status(200).json("message: Server Up 🚀🚀🚀");
});

app.get("/home", (req: Request, res: Response) => {
  return res.render("mail");
});

app.use("/api/products", productsRouter);
app.use("/api/detail", detailRouter);
app.use("/api/order", orderRouter);

app.listen(PORT, () => {
  console.log(`Listening on PORT.: ${PORT}`);
});
