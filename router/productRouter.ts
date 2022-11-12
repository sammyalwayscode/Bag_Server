import { Router } from "express";
import {
  createProducts,
  deleteProduct,
  getOneProduct,
  getProducts,
  searchProducts,
  updateProduct,
} from "../controller/productController";
import { upload } from "../config/multer";
const router = Router();

router.route("/").get(getProducts);
router.route("/:id").get(getOneProduct);
router.route("/newProduct").post(upload, createProducts);
router.route("/updateProduct/:id").patch(upload, updateProduct);
router.route("/delete/:id").delete(deleteProduct);
router.route("/search/pro").get(searchProducts);

export default router;
