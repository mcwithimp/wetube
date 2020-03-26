import routes from "../routes";

export const getJoin = (req, res) => {
  console.log("TRY JOIN!!");
  res.render("join", { title: "Join" });
};

export const postJoin = (req, res) => {
  const { name, email, password, password2 } = req.body;
  if (password !== password2) {
    res.status(400); // Bad request
    res.render("join", { title: "Join" });
  } else {
    // To Do: Register User
    // To Do: Log user in
    res.redirect(routes.home);
  }
};

export const getLogin = (req, res) => res.render("login", { title: "Log In" });
export const postLogin = (req, res) => {
  console.log(req.body);
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  // To Do: Process Log Out
  res.redirect(routes.home);
};

export const editProfile = (req, res) =>
  res.render("editProfile", { title: "Edit Profile" });

export const userDetail = (req, res) =>
  res.render("userDetail", { title: "User Detail" });

export const changePassword = (req, res) =>
  res.render("changePassword", { title: "Change Password" });
