import routes from "../routes";
import Video from "../models/Video";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({});
    res.render("home", { title: "Home", videos });
    console.log({ videos });
    console.log(videos[0].id);
    console.log(videos[0].title);
    console.log(videos[0].fileUrl);
  } catch (error) {
    console.log(error);
    res.render("home", { title: "Home", videos: [] });
  }
};

export const search = (req, res) => {
  const { term: searchingBy } = req.qurey;
  res.render("search", { title: "Search", searchingBy, videos });
};

export const getUpload = (req, res) => {
  res.render("upload", { title: "Upload" });
};
export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path: fileUrl }
  } = req;

  // To Do: Upload and save video
  const newVideo = await Video.create({
    fileUrl,
    title,
    description
  });
  console.log({ newVideo });
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = (req, res) => {
  const { id } = req.params;
  res.render("videoDetail", { title: "Video Detail", id });
};

export const editVideo = (req, res) =>
  res.render("editVideo", { title: "Edit Video" });
export const deleteVideo = (req, res) =>
  res.render("deleteVideo", { title: "Delete Video" });
