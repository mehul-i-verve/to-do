const Todo = require("../models/todo.model");

exports.saveTodo = async (todo) => {
  let new_todo = new Todo({ ...todo });
  const todo_data = await new_todo.save();

  return todo_data;
};

exports.findTodoById = async (id) => {
  return await Todo.findById(id);
};

exports.updateTodo = async (id, body) => {
  return await Todo.findByIdAndUpdate(id, body, { new: true });
};

exports.findTodoUsingTitle = async (search) => {
  return await Todo.find({
    title: { $regex: search, $options: "i" },
  });
};

exports.deleteTodo = async (id) => {
  return await Todo.findByIdAndDelete(id);
};
