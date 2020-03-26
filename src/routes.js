const routes = {
  // Videos
  home: "/",
  videos: "/videos",
  search: "/search",
  upload: "/upload",
  videoDetail: id => (id ? `/videos/${id}` : "/:id"),
  editVideo: "/:id/edit",
  deleteVideo: "/:id/delete",

  // Users
  users: "/users",
  join: "/join",
  login: "/login",
  logout: "/logout",
  userDetail: id => (id ? `/users/${id}` : "/:id"),
  editProfile: "/edit-profile",
  changePassword: "/change-password"
};

export default routes;
