import express from "express";
import {
  getAllOrders,
  getOneOrder,
  createNewOrder,
  editOneOrder,
  deleteOneOrder,
} from "../controllers/orders.js";

const orderRouter = new express.Router();
orderRouter.route("/").get(getAllOrders).post(createNewOrder);
orderRouter
  .route("/:id")
  .get(getOneOrder)
  .put(editOneOrder)
  .delete(deleteOneOrder);

export default orderRouter;
