const verifyAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.render("login", { message: "" });
};

module.exports = {
  verifyAuth,
};
