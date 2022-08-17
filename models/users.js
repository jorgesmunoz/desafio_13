const mongoose = require("mongoose");

const usersController = "users";

let validateEmail = (email) => {
  let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const usersSchema = new mongoose.Schema({
  id: { type: String, required: true },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    validator: [validateEmail, "you must fill a valid email address"],
    required: [true, "you must insert an email"],
  },
  password: { type: String, required: [true, "you must insert a password"] },
});

const users = new mongoose.model(usersController, usersSchema);

module.exports = { users };
