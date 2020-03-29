import express from "express";
import routes from "../routes";
import * as UC from "../controllers/userController";
import { onlyPrivate } from "../middlewares";

const userRouter = express.Router();

// users/edit-profile
userRouter.get(routes.editProfile, onlyPrivate, UC.editProfile);

// users/change-passwprd
userRouter.get(routes.changePassword, onlyPrivate, UC.changePassword);

// users/:id
userRouter.get(routes.userDetail(), onlyPrivate, UC.userDetail);

export default userRouter;
