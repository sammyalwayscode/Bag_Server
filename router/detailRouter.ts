import { Router } from "express";
import {
  createDetail,
  deleteProductDetail,
  getDetail,
  updateProductDetail,
} from "../controller/detailController";
import { uploadDetail } from "../config/multer";

const router = Router();

router.route("/:id").get(getDetail);
router.route("/:id/detail").post(uploadDetail, createDetail);
router.route("/update/:id").patch(uploadDetail, updateProductDetail);
router.route("/remove/:id").delete(deleteProductDetail);

export default router;
