const uuid = require("uuid");
const { getUser, createUser } = require("../controllers/users");
const passport = require("passport");
const LocalStrategy = require("passport-local");

passport.use(
  "login",
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    async function (req, username, password, next) {
      let user = await getUser(username);
      if (user && user.email === username && user.password === password) {
        req.session.name = username;
        return next(null, user);
      }
      return next(null, false);
    },
    function (err, user) {
      next(err, user);
    }
  )
);

passport.use(
  "register",
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    async function (req, username, password, next) {
      let user = await getUser(username);
      if (user) {
        return next(null, false);
      }
      try {
        const user = await createUser(username, password);
        req.session.name = username;
        next(null, user);
      } catch (error) {
        console.log(error);
        next(null, false);
        // return res.render("signup", { message: "user already exists" });
      }
    }
  )
);

passport.serializeUser(function (user, next) {
  next(null, user.email);
});

passport.deserializeUser(function (username, next) {
  let user = getUser(username);
  next(null, user);
});

const login = async (req, res, next) => {
  if (req.session?.name) {
    next();
  } else {
    const { name, password } = req.body;
    const user = await getUser(name);

    if (!name) {
      return res.render("login", { message: "" });
    }

    if (user && user.email === name && user.password === password) {
      req.session.name = name;
      next();
    } else {
      res.render("login", { message: "user or password is incorrect" });
    }
  }
};

module.exports = {
  login,
};
