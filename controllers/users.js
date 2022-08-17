const uuid = require("uuid");
const { users } = require("../models/users");
const knexConfig = require("../knexfile");
const knex = require("knex")(knexConfig[process.env.NODE_ENV]);

const serveSignUp = (req, res) => {
  res.render("signup", { message: "" });
};

const signUp = (req, res) => {
  res.redirect("/");
};

const createUser = async (username, password) => {
  const newUser = {
    id: uuid.v4(),
    email: username,
    password: password,
  };
  const response = await users.create(newUser);
  return response;
  try {
    const response = await users.create(newUser);
    req.session.name = name;
    res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.render("signup", { message: "user already exists" });
  }
};

const getUser = async (name) => {
  try {
    const queryResult = await users.findOne({ email: name }).exec();
    return queryResult;
  } catch (error) {
    return error;
  }
};

module.exports = {
  serveSignUp,
  signUp,
  createUser,
  getUser,
};
