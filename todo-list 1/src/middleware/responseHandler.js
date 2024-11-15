let response = (req, res, next) => {
  res.succeed = (data, message, status = 200) => {
    res.status(status).json({
      flag: true,
      code: status,
      data: data,
      message: message,
      error: null,
    });
  };
  res.failed = (status, message, error = {}) => {
    res.status(status).json({
      flag: false,
      code: status,
      data: null,
      message: message,
      error: error,
    });
  };
  next();
};

module.exports = response;
