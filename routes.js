const routes = {
  // Videos
  home: "/",
  videos: "/videos",
  search: "/search",
  upload: "/upload",
  videoDetail: "/:id",
  editVideo: "/:id/edit",
  deleteVideo: "/:id/delete",

  // Users
  join: "/join",
  login: "/login",
  logout: "/logout",
  users: "/users",
  userDetail: "/:id",
  editProfile: "/edit-profile",
  changePassword: "/change-password"
};

export default routes;
