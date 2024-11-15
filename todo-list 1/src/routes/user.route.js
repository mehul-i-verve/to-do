const express = require("express");
const User = require("../controllers/user.controller");
const Middleware = require("../middleware/auth");
const validate = require("../middleware/validate");
const userValidation = require("../validations/user-validation");

const router = express.Router();

router
  .route("/register")
  .post(validate(userValidation.createUser), User.register);

router.route("/login").post(validate(userValidation.login), User.login);

module.exports = router;
