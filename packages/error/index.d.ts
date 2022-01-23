import {
  ASTNode,
  GraphQLError as BaseGraphQLError,
  GraphQLFormattedError,
  Source,
  SourceLocation,
} from "graphql";
export declare class GraphqlError extends Error implements BaseGraphQLError {
  extensions: Record<string, any>;
  readonly name: string;
  readonly locations: ReadonlyArray<SourceLocation> | undefined;
  readonly path: ReadonlyArray<string | number> | undefined;
  readonly source: Source | undefined;
  readonly positions: ReadonlyArray<number> | undefined;
  readonly nodes: ReadonlyArray<ASTNode> | undefined;
  originalError: Error | undefined;
  constructor(message: string, code: string, extensions?: Record<string, any>);
  toJSON(): GraphQLFormattedError;
  get [Symbol.toStringTag](): string;
}
export declare class InternalError extends GraphqlError {
  constructor(message: string, extensions?: Record<string, any>);
}
export declare class InputError extends GraphqlError {
  constructor(message: string, extensions?: Record<string, any>);
}
export declare class ValidationError extends GraphqlError {
  constructor(message: string, extensions?: Record<string, any>);
}
export declare class AuthenticationError extends GraphqlError {
  constructor(message: string, extensions?: Record<string, any>);
}
export declare class AuthorizationError extends GraphqlError {
  constructor(message: string, extensions?: Record<string, any>);
}
