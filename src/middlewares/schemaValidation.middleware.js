import { ZodError } from "zod";
import { AppError } from "../utils/AppError.js";

//! User Schema Validation
export const userSchemaValidation = (schema) => (req, res, next) => {
  const result = schema.safeParse({ body: req?.body });
  console.log(result?.data?.body);

  //! check result success or failure
  if (!result.success) {
    const formattedError = result?.error?.issues?.map((issue) => ({
      field: issue.path.slice(1).join("."),
      message: issue.message,
    }));
    return next(AppError(400, "Validation failded", formattedError));
  }
  // If all clear then pass the result data to the req.body
  req.body = result.data.body;
  next();
};

//! Product Schema Validation via Zod
export const productSchemaValidation = (schema) => (req, res, next) => {
  const result = schema.safeParse({ body: req?.body });
  if (!result.success) {
    const formattedError = result?.error?.issues?.map((issue) => ({
      field: issue.path.slice(1).join("."),
      message: issue.message,
    }));
    return next(AppError(400, "Validation Error", formattedError));
  }
  //! All clear then set req.body data
  req.body = result.data.body;
  next();
};
