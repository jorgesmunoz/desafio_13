const { getUser } = require("../controllers/users");

const get = async (req, res) => {
  const { user } = req.session.passport;
  res.render("base", { info: user });
};

const post = (req, res) => {
  res.redirect("/");
};

const home = (req, res) => {
  res.redirect("/");
};

const destroy = (req, res) => {
  try {
    req.session.destroy();
    res.redirect("/");
  } catch (error) {
    res.status(500).send("error: ", error);
  }
};

const serveLoginFailure = (req, res) => {
  res.render("login", { message: "user or password is incorrect" });
};

const serveSignUpFailure = (req, res) => {
  res.render("signup", { message: "user already exists" });
};

module.exports = {
  get,
  post,
  home,
  destroy,
  serveLoginFailure,
  serveSignUpFailure,
};
