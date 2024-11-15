const {
  saveTodo,
  updateTodo,
  findTodoById,
  findTodoUsingTitle,
  deleteTodo,
} = require("../service/todo.service");

exports.create = async (req, res) => {
  try {
    const todo = await saveTodo({ ...req.body, user_id: req.user });

    return res.succeed(todo, "Todo created successfully", 201);
  } catch (error) {
    return res.failed(500, "Internal server error", error);
  }
};

exports.update = async (req, res) => {
  try {
    const { id, title, description, status, priority } = req.body;

    const isExist = await findTodoById(req.body.id);

    if (!isExist) return res.failed(400, "Please Provide Valid Id.");

    const todo = await updateTodo(id, {
      title,
      description,
      status,
      priority,
    });

    return res.succeed(todo, "Todo created successfully", 201);
  } catch (error) {
    return res.failed(500, "Internal server error", error);
  }
};

exports.getTodo = async (req, res) => {
  try {
    const isExist = await findTodoById(req.query.id);

    if (!isExist) return res.failed(400, "Please Provide Valid Id.");

    return res.succeed(isExist, "Todo found successfully", 200);
  } catch (error) {
    return res.failed(500, "Internal server error", error);
  }
};

exports.searchTodo = async (req, res) => {
  try {
    const { title } = req.query;

    const todoList = await findTodoUsingTitle(title);

    return res.succeed(todoList, "Todos found successfully", 200);
  } catch (error) {
    console.log(error);
    return res.failed(500, "Internal server error", error);
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.query;

    const isExist = await findTodoById(id);

    if (!isExist) return res.failed(400, "Please Provide Valid Id.");

    await deleteTodo(id);

    return res.succeed(isExist, "Todo found successfully", 200);
  } catch (error) {
    return res.failed(500, "Internal server error", error);
  }
};
