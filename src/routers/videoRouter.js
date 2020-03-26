import express from "express";
import routes from "../routes";
import { uploadVideo } from "../middlewares";
import * as videoController from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get(routes.home, videoController.home);
videoRouter.get(routes.search, videoController.search);

// videos/upload
videoRouter.get(routes.upload, videoController.getUpload);
videoRouter.post(routes.upload, uploadVideo, videoController.postUpload);

// videos/:id
videoRouter.get(routes.videoDetail(), videoController.videoDetail);

export default videoRouter;
