import { RequestHandler } from "express";
import * as yup from "yup";
export const validate = (schema: any): RequestHandler => {
  // pass the "schema" as the rule for validation
  return async (req, res, next) => {
    if (!req.body) {
      return res.status(422).json({ error: "Empty body is not expected!" });
    }
    // convert schema into "yup" object
    const schemaToValidate = yup.object({
      body: schema,
    });
    try {
      await schemaToValidate.validate(
        {
          body: req.body,
        },
        { abortEarly: true }
      );
      next();
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        res.status(422).json({ error: error.message });
      }
    }
  };
};
