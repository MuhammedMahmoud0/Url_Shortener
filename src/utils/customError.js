// class CustomError extends Error {
//   constructor(message, statusCode) {
//     super(message);

//     this.statusCode = statusCode;
//     this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";

//     this.isOperational = true;

//     Error.captureStackTrace(this, this.constructor);
//   }
// }

// export default CustomError;

// @desc    this class is responsible about operation errors (errors that i can predict)
class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith(4) ? "fail" : "error";
    this.isOperational = true;
  }
}

export default CustomError;
