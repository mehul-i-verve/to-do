const Joi = require("joi");

const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

exports.createTodo = {
  body: Joi.object().keys({
    title: Joi.string().required().min(5),
    description: Joi.string().required(),
    priority: Joi.number().required().min(1).max(3),
  }),
};

exports.updateTodo = {
  body: Joi.object().keys({
    id: Joi.required().custom(objectId),
    title: Joi.string().required().min(5),
    description: Joi.string().required(),
    status: Joi.string().required(),
    priority: Joi.number().required().min(1).max(3),
  }),
};

exports.getTodo = {
  query: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};
