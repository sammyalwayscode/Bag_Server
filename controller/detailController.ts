import { Request, Response } from "express";
import detailModel from "../model/detailModel";
import productModel from "../model/productModel";
import cloudinary from "../config/cloudinary";
import mongoose from "mongoose";

const getDetail = async (req: Request, res: Response): Promise<Response> => {
  try {
    const detail = await productModel.findById(req.params.id).populate({
      path: "productDetail",
      options: { sort: { createdAt: -1 } },
    });
    return res.status(200).json({
      message: "Data Gotten",
      data: detail,
    });
  } catch (error) {
    return res.status(404).json({
      message: "An Error Occoured",
      data: error,
    });
  }
};

const createDetail = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { productDesription1, productDesription2 } = req.body;

    const cloudImage = await cloudinary.uploader.upload(req.file?.path);
    const getProduct = await productModel.findById(req.params.id);
    const newDetail = await detailModel.create({
      productName: getProduct?.productName,
      productDesription1,
      productDesription2,
      price: getProduct?.price,
      brandName: getProduct?.brandName,
      bagType: getProduct?.bagType,
      bagColor: getProduct?.bagColor,
      avatar: getProduct?.avatar,
      avatarID: getProduct?.avatarID,
      descAvatar: cloudImage.secure_url,
      descAvatarID: cloudImage.public_id,
    });

    getProduct?.productDetail.push(new mongoose.Types.ObjectId(newDetail._id));
    getProduct?.save();

    return res.status(201).json({
      message: "Detail Created...",
    });
  } catch (error) {
    return res.status(404).json({
      message: "An Error Occoured.",
      data: error,
    });
  }
};

const updateProductDetail = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const check = await detailModel.findById(req.params.id);
    const cloudImage = await cloudinary.uploader.upload(req.path);

    if (check) {
      const { productDesription1, productDesription2 } = req.body;
      cloudinary.uploader.destroy(check.avatarID);

      const updateDetail = await detailModel.findByIdAndUpdate(
        req.params.id,
        {
          productDesription1,
          productDesription2,
          descAvatar: cloudImage.secure_url,
          descAvatarID: cloudImage.public_id,
        },
        { new: true }
      );

      return res.status(201).json({
        message: "Detail Updated",
        data: updateDetail,
      });
    } else {
      return res.status(404).json({
        message: "Can't preform Update",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "An Error Occoured",
      data: error,
    });
  }
};

const deleteProductDetail = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    // const getProduct = await productModel.findById(req.params.id)
    const removeDetail = await detailModel.findByIdAndRemove(req.params.id);
    return res.status(200).json({
      message: "Deleted!!!",
      data: removeDetail,
    });
  } catch (error) {
    return res.status(404).json({
      message: "An Error Occoured",
      data: error,
    });
  }
};

export { getDetail, createDetail, updateProductDetail, deleteProductDetail };
