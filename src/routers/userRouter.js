import express from "express";
import routes from "../routes";
import * as UC from "../controllers/userController";
import { onlyPrivate, uploadAvatar } from "../middlewares";

const userRouter = express.Router();

// users/edit-profile
userRouter.get(routes.editProfile, onlyPrivate, UC.getEditProfile);
userRouter.post(
  routes.editProfile,
  onlyPrivate,
  uploadAvatar,
  UC.postEditProfile
);

// users/change-passwprd
userRouter.get(routes.changePassword, onlyPrivate, UC.getChangePassword);
userRouter.post(routes.changePassword, onlyPrivate, UC.postChangePassword);

// users/:id
userRouter.get(routes.userDetail(), UC.userDetail);

export default userRouter;
