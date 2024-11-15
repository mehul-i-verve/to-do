const Joi = require("joi");

exports.createUser = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
  }),
};

exports.login = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
  }),
};
