import { Router } from "express";
import { createOrder, getOrders } from "../controller/orderController";
const router = Router();

router.route("/").get(getOrders);
router.route("/newOrder").post(createOrder);

export default router;
