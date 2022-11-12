import mongoose from "mongoose";

interface productDetail {
  productName: string;
  productDesription1: string;
  productDesription2: string;
  price: number;
  avatar: string;
  avatarID: string;
  descAvatar: string;
  descAvatarID: string;
  brandName: string;
  bagType: string;
  bagColor: string;
}

interface iDetail extends productDetail, mongoose.Document {}

const productDetailModel = new mongoose.Schema({
  productName: {
    type: String,
  },
  productDesription1: {
    type: String,
  },
  productDesription2: {
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
  descAvatar: {
    type: String,
  },
  descAvatarID: {
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
});

export default mongoose.model<iDetail>("productDetail", productDetailModel);
