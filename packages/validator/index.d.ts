import joi from "joi";
import { Request } from "@middy-graphql/core";
declare type Options = {
  inputSchema?: joi.ObjectSchema<any>;
  outputSchema?: joi.ObjectSchema<any>;
};
declare function validatorMiddleware(options?: Options): {
  before: ((request: Request) => void) | undefined;
  after: ((request: Request) => void) | undefined;
};

export default validatorMiddleware;
