import express from "express";
import routes from "../routes";
import * as controllers from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get(routes.home, controllers.home);
videoRouter.get(routes.search, controllers.search);

export default videoRouter;
