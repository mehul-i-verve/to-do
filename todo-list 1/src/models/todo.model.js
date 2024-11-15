const mongoose = require("mongoose");
const config = require("../config/config");

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      index: true, // Creates an index on the `title` field
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      default: config.TodoStatus.PENDING,
    },
    priority: {
      type: Number,
      trim: true,
    },
    // last_date: {
    //   type: Date,
    //   default: null,
    // },
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

todoSchema.methods.toJSON = function () {
  const todo = this;
  const todoObject = todo.toObject();

  delete todoObject.__v;
  delete todoObject.created_at;
  delete todoObject.updated_at;

  return todoObject;
};

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
