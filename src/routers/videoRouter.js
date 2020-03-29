import express from "express";
import routes from "../routes";
import { uploadVideo, onlyPrivate } from "../middlewares";
import * as VC from "../controllers/videoController";

const videoRouter = express.Router();

// videos/upload
videoRouter.get(routes.upload, onlyPrivate, VC.getUpload);
videoRouter.post(routes.upload, onlyPrivate, uploadVideo, VC.postUpload);

// videos/:id
videoRouter.get(routes.videoDetail(), VC.videoDetail);

// videos/:id/edit
videoRouter.get(routes.editVideo(), onlyPrivate, VC.getEditVideo);
videoRouter.post(routes.editVideo(), onlyPrivate, VC.postEditVideo);

// videos/:id/delete
videoRouter.get(routes.deleteVideo(), VC.deleteVideo);

export default videoRouter;
