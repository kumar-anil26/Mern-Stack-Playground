export const errorHandler = (err, req, res, next) => {
  if (err.name === "ValidationError") {
    const errors = {};
    for (const field in err.errors) {
      errors[field] = err.errors[field].message;
    }
    return res
      .status(400)
      .json({ success: false, message: "Validation Failed", errors });
  }

  if (err.name === "CastError") {
    return res
      .status(400)
      .json({ success: false, message: "Invalid resources ID" });
  }
  if (err.code === 11000) {
    return res.status(400).json({ success: false, message: "Duplicate value" });
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error.";
  return res.status(statusCode).json({ success: false, message: message,Errors:err.errors });
};
