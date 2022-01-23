import joi from "joi";
import { Request } from "@middy-graphql/core";
import { ValidationError } from "@middy-graphql/error";

type Options = {
  inputSchema?: joi.ObjectSchema<any>;
  outputSchema?: joi.ObjectSchema<any>;
};

export default function validatorMiddleware(options: Options = {}) {
  const { inputSchema, outputSchema } = options;

  const validatorMiddlewareBefore = (request: Request) => {
    const { error } = inputSchema!.validate(request.args);

    if (error) {
      const { message, path } = errorParser(error);

      throw new ValidationError(message, { path });
    }
  };

  const validatorMiddlewareAfter = (request: Request) => {
    const { error } = outputSchema!.validate(request.response);

    if (error) {
      const { message, path } = errorParser(error);

      throw new ValidationError(message, { path });
    }
  };
  return {
    before: inputSchema ? validatorMiddlewareBefore : undefined,
    after: outputSchema ? validatorMiddlewareAfter : undefined,
  };
}

function errorParser(error: joi.ValidationError) {
  const { message, path } = error.details[0];

  return {
    message,
    path,
  };
}
