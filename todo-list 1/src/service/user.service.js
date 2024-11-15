const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const keys = require("../config/config");

exports.validateEmailInDatabase = async (req) => {
  let check_user = await User.findOne({ email: req.email });
  if (check_user) return false;
  return true;
};

exports.create = async (user) => {
  let new_user = new User({ ...user });
  const user_data = await new_user.save();

  const payload = { id: new_user._id };
  user_data.JWToken = jwt.sign(payload, keys.JWToken, { expiresIn: 86400 });

  return user_data;
};

exports.findByInput = async (email, password) => {
  let user = await User.findOne({ email });
  if (!user) return false;

  let isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return false;

  const payload = {
    id: user._id,
  };

  let JWToken = jwt.sign(payload, keys.JWToken, { expiresIn: 86400 });
  return { user, JWToken };
};
