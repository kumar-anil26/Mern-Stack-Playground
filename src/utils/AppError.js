export const AppError = (statusCode, message, errors = null) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.errors = errors;

  return error;
};

// export class AppError extends Error {
//   constructor(message, statusCode) {
//     super(message);
//     this.statusCode = statusCode;
//     this.isOperational = true;

//     Error.captureStackTrace(this, this.constructor);
//   }
// }
