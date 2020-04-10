import routes from "../routes";
import Video from "../models/Video";

export const home = async (req, res) => {
  let videos = [];
  try {
    videos = await Video.find({}).sort({ createdAt: "desc" });
  } catch (error) {
    console.log(error);
  }
  res.render("home", { title: "Home", videos });
};

export const search = async (req, res) => {
  const { term: searchingBy } = req.query;
  const pattern = new RegExp(searchingBy, "i");
  let videos = [];
  try {
    // 제목만으로 검색 (리밋 걸고)
    //  1) 리밋만큼 나오면 패스
    //  To Do: 2) 리밋보다 적으면, 내용에서만 검색
    videos = await Video.find({
      title: { $regex: pattern },
    });

    // const videos = await Video.find({
    //   title: { $nin: [pattern] },
    //   description: { $regex: pattern }
    // });
  } catch (error) {
    console.log(error);
  }
  res.render("search", { title: "Search", searchingBy, videos });
};

export const getUpload = (req, res) => {
  res.render("upload", { title: "Upload" });
};
export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path: fileUrl },
  } = req;

  // To Do: Upload and save video
  const newVideo = await Video.create({
    fileUrl,
    title,
    description,
    creator: req.user.id,
  });
  req.user.videos.push(newVideo.id);
  req.user.save();
  console.log({ newVideo });
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const video = await Video.findById(id).populate("creator");
    res.render("videoDetail", { title: video.title, video });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const getEditVideo = async (req, res) => {
  const { id } = req.params;
  try {
    const video = await Video.findById(id);
    if (video.creator.id !== req.user.id) {
      throw Error();
    }
    res.render("editVideo", { title: `Edit ${video.title}`, video });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
  } = req;
  try {
    await Video.findByIdAndUpdate(id, { title, description });

    res.redirect(routes.videoDetail(id));
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;

  try {
    const video = await Video.findById(id);
    if (video.creator.id !== req.user.id) {
      throw Error();
    } else {
      await Video.findByIdAndDelete(id);
    }
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};
