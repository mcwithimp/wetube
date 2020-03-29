const routes = {
  // Videos
  home: "/",
  videos: "/videos",
  search: "/search",
  upload: "/upload",
  videoDetail: id => (id ? `/videos/${id}` : "/:id"),
  editVideo: id => (id ? `/videos/${id}/edit` : "/:id/edit"),
  deleteVideo: id => (id ? `/videos/${id}/delete` : "/:id/delete"),

  // Users
  users: "/users",
  join: "/join",
  login: "/login",
  logout: "/logout",
  me: "/me",
  userDetail: id => (id ? `/users/${id}` : "/:id"),
  editProfile: "/edit-profile",
  changePassword: "/change-password",

  // Social Login
  github: "/auth/github",
  githubCallback: "/auth/github/callback",
  kakao: "/auth/kakao",
  kakoCallback: "/auth/github/kakao"
};

export default routes;
