import { Request, Response } from "express";
import { recieveOrder } from "../email/email";
import orderModel from "../model/orderModel";

const getOrders = async (req: Request, res: Response): Promise<Response> => {
  try {
    const getOrder = await orderModel.find();
    return res.status(200).json({
      message: "Data Gotten Sucessfully",
      data: getOrder,
    });
  } catch (error) {
    return res.status(404).json({
      message: "An Error Occoured",
      data: error,
    });
  }
};

const createOrder = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, email, address } = req.body;
    const newOrder = await orderModel.create({
      name,
      email,
      address,
    });
    recieveOrder(email, name)
      .then((result) => {
        console.log("Mail Sent", result);
      })
      .catch((error) => {
        console.log(error);
      });
    return res.status(201).json({
      message: "Order Sent",
      data: newOrder,
    });
  } catch (error) {
    return res.status(404).json({
      message: "An Error Occoured",
      data: error,
    });
  }
};

export { getOrders, createOrder };
