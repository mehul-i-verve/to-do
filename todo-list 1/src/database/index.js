const mongoose = require("mongoose");
const keys = require("../config/config");
const Todo = require("../models/todo.model");

mongoose
  .connect(keys.DBConnection, {
    useNewUrlParser: true,
  })
  .then(async () => {
    await Todo.createIndexes({ title: 1 }); // 1 for ascending order
    console.log("Database connected");
  })
  .catch((err) => console.log("Error in database connection", err.message));
