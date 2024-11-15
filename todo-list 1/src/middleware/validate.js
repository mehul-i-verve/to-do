const Joi = require("joi");
const pick = require("../utils/pick");
const ApiError = require("../utils/apiError");
const app = require("express")();

app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  return next(err);
});

const validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ["params", "query", "body"]);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: "key" }, abortEarly: false })
    .validate(object);

  if (error) {
    const errorMessage = error.details
      .map((details) => details.message)
      .join(", ");
    return res.status(400).json({ error: errorMessage });
  }
  Object.assign(req, value);
  return next();
};

module.exports = validate;
