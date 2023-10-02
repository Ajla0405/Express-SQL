import express from "express";

import {
  getAllUsers,
  getOneUser,
  createNewUser,
  editOneUser,
  deleteOneUser,
} from "../controllers/users.js";

const userRouter = new express.Router();

userRouter.route("/").get(getAllUsers).post(createNewUser);
userRouter.route("/:id").get(getOneUser).put(editOneUser).delete(deleteOneUser);

export default userRouter;
