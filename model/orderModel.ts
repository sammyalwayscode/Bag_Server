import mongoose from "mongoose";

interface order {
  name: string;
  email: string;
  address: string;
}

interface iOrder extends order, mongoose.Document {}

const orderModel = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<iOrder>("orders", orderModel);
