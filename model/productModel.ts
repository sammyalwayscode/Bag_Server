import mongoose from "mongoose";

interface Product {
  productName: string;
  price: number;
  avatar: string;
  avatarID: string;
  brandName: string;
  bagType: string;
  bagColor: string;
  productDetail: {}[];
}
interface iProduct extends Product, mongoose.Document {}

const productModel = new mongoose.Schema(
  {
    productName: {
      type: String,
    },
    price: {
      type: Number,
    },
    avatar: {
      type: String,
    },
    avatarID: {
      type: String,
    },
    brandName: {
      type: String,
    },
    bagType: {
      type: String,
    },
    bagColor: {
      type: String,
    },
    productDetail: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "productDetail",
        },
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.model<iProduct>("Products", productModel);
