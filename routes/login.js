const loginRouter = require("express").Router();
const { login } = require("../middleware/auth");
const {
  get,
  post,
  home,
  destroy,
  serveLoginFailure,
  serveSignUpFailure,
} = require("../controllers/auth");
const { serveSignUp, signUp } = require("../controllers/users");
const passport = require("passport");
const { verifyAuth } = require("../middleware/authentication");

// Login routes
loginRouter.get("/", verifyAuth, get);
loginRouter.post(
  "/",
  passport.authenticate("login", { failureRedirect: "/loginFailure" }),
  post
);
loginRouter.post(
  "/home",
  passport.authenticate("login", { failureRedirect: "/loginFailure" }),
  home
);
loginRouter.post("/logout", destroy);

// Signup routes
loginRouter.get("/signup", serveSignUp);
loginRouter.post(
  "/signup",
  passport.authenticate("register", { failureRedirect: "/signupFailure" }),
  signUp
);

loginRouter.get("/loginFailure", serveLoginFailure);
loginRouter.get("/signupFailure", serveSignUpFailure);

module.exports = loginRouter;
