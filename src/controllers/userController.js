import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => {
  res.render("join", { title: "Join" });
};

export const postJoin = async (req, res, next) => {
  const { name, email, password, password2 } = req.body;
  // password check could be done in Client
  if (password !== password2) {
    req.flash("error", "Passwords don't match");
    res.status(400); // Bad request
    res.render("join", { title: "Join" });
  } else {
    try {
      const user = await User({ name, email });
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
  }
};

export const getLogin = (req, res) => res.render("login", { title: "Log In" });
export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home
});

export const githubLogin = passport.authenticate("github", {
  successFlash: "Welcome",
  failureFlash: "Can't log in at this time"
});

export const kakaoLogin = passport.authenticate("kakao", {
  successFlash: "Welcome",
  failureFlash: "Can't log in at this time"
});

export const githubLoginCallback = async (_, __, profile, done) => {
  const {
    _json: { id, avatar_url: avatarUrl, name, email }
  } = profile;

  try {
    // user has not set name and email in github
    // on the other hand, passportMongoose manages a user by email
    // UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });
    const user = await User.findOne({ email });
    if (user) {
      user.githubId = id;
      user.save();
      return done(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      githubId: id,
      avatarUrl
    });

    return done(null, newUser);
  } catch (error) {
    return done(error);
  }
};

export const kakaoLoginCallback = (_, __, profile, done) => {
  console.log(profile, done);
};

export const postGithubLogin = passport.authenticate("github", {
  failureRedirect: routes.login,
  successRedirect: routes.home
});

export const postKakaoLogin = passport.authenticate("kako", {
  failureRedirect: routes.login,
  successRedirect: routes.home
});

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

export const editProfile = (req, res) =>
  res.render("editProfile", { title: "Edit Profile" });

export const getMe = (req, res) =>
  res.render("userDetail", { title: "User Detail", user: req.user });

export const userDetail = (req, res) =>
  res.render("userDetail", { title: "User Detail" });

export const changePassword = (req, res) =>
  res.render("changePassword", { title: "Change Password" });
