// const errorHandlerMiddleware = (err, req, res, next) => {
//   err.statusCode = err.statusCode || 500;
//   err.status = err.status || "error";

//   res.status(err.statusCode).json({
//     success: false,
//     status: err.status,
//     message: err.message || "Internal Server Error",
//     stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
//   });
// };

// export default errorHandlerMiddleware;

// const handleJwtInvalidSignature = () =>
//   new ApiError('Invalid token, please login again..', 401);

// const handleJwtExpired = () =>
//   new ApiError('Expired token, please login again..', 401);

const sendErrorForDev = (err, res) =>
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });

const sendErrorForProd = (err, res) =>
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });

const errorHandlerMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    sendErrorForDev(err, res);
  } else {
    // if (err.name === 'JsonWebTokenError') err = handleJwtInvalidSignature();
    // if (err.name === 'TokenExpiredError') err = handleJwtExpired();
    sendErrorForProd(err, res);
  }
};

export default errorHandlerMiddleware;
