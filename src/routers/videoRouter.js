import express from "express";
import routes from "../routes";
import { uploadVideo } from "../middlewares";
import * as videoController from "../controllers/videoController";

const videoRouter = express.Router();

// videos/upload
videoRouter.get(routes.upload, videoController.getUpload);
videoRouter.post(routes.upload, uploadVideo, videoController.postUpload);

// videos/:id
videoRouter.get(routes.videoDetail(), videoController.videoDetail);

// videos/:id/edit
videoRouter.get(routes.editVideo(), videoController.getEditVideo);
videoRouter.post(routes.editVideo(), videoController.postEditVideo);

// videos/:id/delete
videoRouter.get(routes.deleteVideo(), videoController.deleteVideo);

export default videoRouter;
