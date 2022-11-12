import { Request, Response } from "express";
import productModel from "../model/productModel";
import cloudinary from "../config/cloudinary";
import multer from "multer";

const getProducts = async (req: Request, res: Response): Promise<Response> => {
  try {
    const product = await productModel.find();
    return res.status(200).json({
      message: "Products Gotten",
      data: product,
    });
  } catch (error) {
    return res.status(404).json({
      message: "An Error Occoured ❌❌❌",
      data: error,
    });
  }
};

const getOneProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const findOneProduct = await productModel.findById(req.params.id);
    return res.status(200).json({
      message: "Product Found",
      data: findOneProduct,
    });
  } catch (error) {
    return res.status(404).json({
      message: "An Error Occoured",
      data: error,
    });
  }
};

const createProducts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { productName, price, brandName, bagType, bagColor } = req.body;
    const cloudImage = await cloudinary.uploader.upload(req.file?.path);
    const uploadProduct = await productModel.create({
      productName,
      price,
      brandName,
      bagType,
      bagColor,
      avatar: cloudImage.secure_url,
      avatarID: cloudImage.public_id,
    });

    return res.status(201).json({
      message: "Product Created Sucessfully",
      data: uploadProduct,
    });
  } catch (error) {
    return res.status(404).json({
      message: "An Error Occoured",
      data: error,
    });
  }
};

const updateProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const check = await productModel.findById(req.params.id);
    if (check) {
      const { productName, price, brandName, bagType, bagColor } = req.body;
      cloudinary.uploader.destroy(check?.avatarID);
      const cloudImage = await cloudinary.uploader.upload(req.file?.path);
      // const cloudImage = await cloudinary.uploader.upload(req?.file!.path);

      const updateProduct = await productModel.findByIdAndUpdate(
        req.params.id,
        {
          productName,
          price,
          brandName,
          bagType,
          bagColor,
          avatar: cloudImage.secure_url,
          avatarID: cloudImage.public_id,
        },
        { new: true }
      );
      return res.status(201).json({
        message: "Product Updated",
        data: updateProduct,
      });
    } else {
      return res.status(404).json({
        message: "Can't Perform Update",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "An Error Occoured",
      data: error,
    });
  }
};

const deleteProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const productDelete = await productModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      message: "Delete Sucessfull",
      data: productDelete,
    });
  } catch (error) {
    return res.status(404).json({
      message: "An Error Occoured",
      data: error,
    });
  }
};

const searchProducts = async (req: Request, res: Response) => {
  try {
    // const keyword = req.query.search ?
    // {
    //   $or: [
    //     {productName: {$regex: req.query.search, $options:"i"}}
    //     {brandName: {$regex: req.query.search, $options:"i"}}
    //   ]
    // } : {}
    //const user =  await productModel.find(keyword)

    const newQuery = req.query;
    const product = await productModel.find(newQuery);
    return res.status(200).send(product);
  } catch (error) {
    return res.status(404).json({
      message: "An Error Occoured",
      data: error,
    });
  }
};

export {
  getProducts,
  createProducts,
  updateProduct,
  deleteProduct,
  getOneProduct,
  searchProducts,
};
