require("dotenv").config();

module.exports = {
  DBConnection: process.env.DB_CONNECTION,
  JWToken: process.env.JWT_SECRET,
  TodoStatus: {
    PENDING: "Pending",
    COMPLETED: "Completed",
    CANCELLED: "Cancelled",
  },
  PORT: process.env.PORT,
};
