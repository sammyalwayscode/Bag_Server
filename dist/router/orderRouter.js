"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orderController_1 = require("../controller/orderController");
const router = (0, express_1.Router)();
router.route("/").get(orderController_1.getOrders);
router.route("/newOrder").post(orderController_1.createOrder);
exports.default = router;
