const userService = require("../service/user.service");

exports.register = async (req, res) => {
  try {
    var isEmailValid = await userService.validateEmailInDatabase(req.body);
    if (!isEmailValid) return res.failed(400, "Email is already registered");

    var user = await userService.create(req.body);

    return res.succeed({ user, token }, "User created", 201);
  } catch (error) {
    return res.failed(500, "Internal server error", error);
  }
};

exports.login = async (req, res) => {
  try {
    const user_data = await userService.findByInput(
      req.body.email,
      req.body.password
    );

    if (!user_data) return res.failed(400, "email or password does not match");

    return res.succeed(user_data, "Logged in successfully");
  } catch (error) {
    return res.failed(500, "Internal Server Error", error);
  }
};
