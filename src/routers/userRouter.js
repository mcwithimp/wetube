import express from "express";
import routes from "../routes";
import * as userController from "../controllers/userController";

const userRouter = express.Router();

// users/edit-profile
userRouter.get(routes.editProfile, userController.editProfile);

// users/change-passwprd
userRouter.get(routes.changePassword, userController.changePassword);

// users/:id
userRouter.get(routes.userDetail(), userController.userDetail);

export default userRouter;
