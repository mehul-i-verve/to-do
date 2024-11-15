const express = require("express");
const cors = require("cors");

require("dotenv").config();

const PORT = process.env.PORT || 6000;
const userRoutes = require("./src/routes/user.route");
const todoRoutes = require("./src/routes/todo.route");
const responseHandler = require("./src/middleware/responseHandler");
const ApiError = require("./src/utils/apiError");
const httpStatus = require("http-status");

const app = express();

app.use(cors());

require("./src/database/index");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(responseHandler);

app.use("/v1/user", userRoutes);
app.use("/v1/todo", todoRoutes);

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

app.listen(PORT, () => console.log(`App running on port ${PORT}...`));
