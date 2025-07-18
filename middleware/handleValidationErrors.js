import { validationResult } from "express-validator";

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req).array();

  if (errors.length > 0) {
    return res.status(400).json({
      message: errors[0].msg, // first error for the user
      errors,
    });
  }

  next();
};
