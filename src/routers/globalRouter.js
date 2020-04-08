import express from "express";
import routes from "../routes";
import * as UC from "../controllers/userController";
import * as VC from "../controllers/videoController";
import { onlyPublic, onlyPrivate } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get(routes.home, VC.home);
globalRouter.get(routes.search, VC.search);

globalRouter.get(routes.join, onlyPublic, UC.getJoin);
globalRouter.post(routes.join, onlyPublic, UC.postJoin, UC.postLogin);

globalRouter.get(routes.login, onlyPublic, UC.getLogin);
globalRouter.post(routes.login, onlyPublic, UC.postLogin);

globalRouter.get(routes.me, onlyPrivate, UC.getMe);

// Social Login
// doesnt need "onlyPublic"?s
globalRouter.get(routes.github, UC.githubLogin);
globalRouter.get(routes.githubCallback, UC.postGithubLogin);
globalRouter.get(routes.facebook, UC.facebookLogin);
globalRouter.get(routes.facebookCallback, UC.postFacebookLogin);
globalRouter.get(routes.google, UC.googleLogin);
globalRouter.get(routes.googleCallback, UC.postGoogleLogin);

globalRouter.get(routes.logout, onlyPrivate, UC.logout);

export default globalRouter;
