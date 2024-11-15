const express = require("express");
const Todo = require("../controllers/todo.controller");
const Middleware = require("../middleware/auth");
const validate = require("../middleware/validate");
const todoValidation = require("../validations/todo-validation");

const router = express.Router();

router
  .route("/")
  .post(
    Middleware.authenticateToken,
    validate(todoValidation.createTodo),
    Todo.create
  );

router
  .route("/")
  .put(
    Middleware.authenticateToken,
    validate(todoValidation.updateTodo),
    Todo.update
  );

router
  .route("/")
  .get(
    Middleware.authenticateToken,
    validate(todoValidation.getTodo),
    Todo.getTodo
  );

router.route("/search").get(Middleware.authenticateToken, Todo.searchTodo);

router
  .route("/")
  .delete(
    Middleware.authenticateToken,
    validate(todoValidation.getTodo),
    Todo.delete
  );

module.exports = router;
