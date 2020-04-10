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
  successRedirect: routes.home,
  successFlash: "Welcome",
  failureFlash: "Can't log in at this time",
});

export const githubLogin = passport.authenticate("github", {
  successFlash: "Welcome",
  failureFlash: "Can't log in at this time",
});

export const facebookLogin = passport.authenticate("facebook", {
  successFlash: "Welcome",
  failureFlash: "Can't log in at this time",
});

export const googleLogin = passport.authenticate("google", {
  successFlash: "Welcome",
  failureFlash: "Can't log in at this time",
});

export const githubLoginCallback = async (_, __, profile, done) => {
  const {
    _json: { id, avatar_url: avatarUrl, name, email },
  } = profile;

  try {
    // WHAT IF github user has no email address which is set as public
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
      avatarUrl,
    });

    return done(null, newUser);
  } catch (error) {
    return done(error, false);
  }
};

export const facebookLoginCallback = async (_, __, profile, done) => {
  const {
    _json: { id, name, email },
  } = profile;

  const avatarUrl = `https://graph.facebook.com/${id}/picture?type=large`;
  try {
    // WHAT IF facebook user has no email address which is set as public
    const user = await User.findOne({ email });
    if (user) {
      user.facebookId = id;
      user.avatarUrl = avatarUrl;
      user.save();
      return done(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      facebookId: id,
      avatarUrl,
    });

    return done(null, newUser);
  } catch (error) {
    return done(error, false);
  }
};

export const googleLoginCallback = async (_, __, profile, done) => {
  const {
    _json: { sub: id, name, email, picture: avatarUrl },
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.googleId = id;
      // user.avatarUrl = avatarUrl;
      user.save();
      return done(null, user);
    }

    const newUser = await User.create({
      email,
      name,
      googleId: id,
      avatarUrl,
    });

    return done(null, newUser);
  } catch (error) {
    return done(error, false);
  }
};

export const postGithubLogin = passport.authenticate("github", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
});

export const postFacebookLogin = passport.authenticate("facebook", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
});

export const postGoogleLogin = passport.authenticate("google", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
});

export const logout = (req, res) => {
  req.logout();
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.redirect(routes.home);
  });
};

export const getEditProfile = (req, res) =>
  res.render("editProfile", { title: "Edit Profile" });

export const postEditProfile = async (req, res) => {
  const {
    body: { name, email },
    file,
  } = req;

  try {
    await User.findByIdAndUpdate(req.user.id, {
      name,
      email,
      avatarUrl: file ? file.path : req.user.avatarUrl,
    });
    res.redirect(routes.me);
  } catch (error) {
    res.redirect(routes.editProfile);
  }
};

export const getMe = (req, res) => {
  res.render("userDetail", { title: "User Detail", user: req.user });
};

export const userDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const user = await User.findById(id).populate("videos");
    console.log({ user });
    res.render("userDetail", { title: "User Detail", user });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const getChangePassword = (req, res) =>
  res.render("changePassword", { title: "Change Password" });

export const postChangePassword = async (req, res) => {
  const { oldPassword, newPassword, newPassword2 } = req.body;

  try {
    if (newPassword !== newPassword2) {
      res.status(400);
      res.redirect(`/users${routes.changePassword}`);
      return;
    }
    await req.user.changePassword(oldPassword, newPassword);
    res.redirect(routes.me);
  } catch (error) {
    console.log({ error });
    res.status(400);
    res.redirect(`/users${routes.changePassword}`);
  }
};
