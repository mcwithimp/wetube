export const join = (req, res) => res.render("join", { title: "Join" });
export const login = (req, res) => res.render("login", { title: "Log In" });
export const logout = (req, res) => res.render("logout", { title: "Log Out" });

export const userDetail = (req, res) =>
  res.render("userDetail", { title: "User Detail" });
export const editProfile = (req, res) =>
  res.render("editProfile", { title: "Edit Profile" });
export const changePassword = (req, res) =>
  res.render("changePassword", { title: "Change Password" });
