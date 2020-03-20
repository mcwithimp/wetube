import express from "express";
import routes from "../routes";
import * as controllers from "../controllers/userController";

const userRouter = express.Router();

userRouter.get(routes.join, controllers.join);
userRouter.get(routes.login, controllers.login);
userRouter.get(routes.logout, controllers.logout);
userRouter.get(routes.userDetail, controllers.userDetail);
userRouter.get(routes.editProfile, controllers.editProfile);
userRouter.get(routes.changePassword, controllers.changePassword);

export default userRouter;
