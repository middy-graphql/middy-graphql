import {
  ASTNode,
  GraphQLError as BaseGraphQLError,
  formatError,
  GraphQLFormattedError,
  Source,
  SourceLocation,
} from "graphql";

export class GraphqlError extends Error implements BaseGraphQLError {
  public extensions: Record<string, any>;
  override readonly name!: string;
  readonly locations: ReadonlyArray<SourceLocation> | undefined;
  readonly path: ReadonlyArray<string | number> | undefined;
  readonly source: Source | undefined;
  readonly positions: ReadonlyArray<number> | undefined;
  readonly nodes: ReadonlyArray<ASTNode> | undefined;
  public originalError: Error | undefined;

  constructor(message: string, code: string, extensions?: Record<string, any>) {
    super(message);

    this.extensions = {
      code,
      ...extensions,
    };
  }

  toJSON(): GraphQLFormattedError {
    return formatError(toGraphQLError(this));
  }

  get [Symbol.toStringTag](): string {
    return this.name;
  }
}

function toGraphQLError(error: GraphqlError): BaseGraphQLError {
  return new BaseGraphQLError(
    error.message,
    error.nodes,
    error.source,
    error.positions,
    error.path,
    error.originalError,
    error.extensions
  );
}

export class InternalError extends GraphqlError {
  constructor(message: string, extensions?: Record<string, any>) {
    super(message, "INTERNAL_SERVER_ERROR", extensions);

    Object.defineProperty(this, "name", { value: "InternalError" });
  }
}

export class InputError extends GraphqlError {
  constructor(message: string, extensions?: Record<string, any>) {
    super(message, "BAD_REQUEST", extensions);

    Object.defineProperty(this, "name", { value: "InputError" });
  }
}

export class ValidationError extends GraphqlError {
  constructor(message: string, extensions?: Record<string, any>) {
    super(message, "GRAPHQL_VALIDATION_FAILED", extensions);

    Object.defineProperty(this, "name", { value: "ValidationError" });
  }
}

export class AuthenticationError extends GraphqlError {
  constructor(message: string, extensions?: Record<string, any>) {
    super(message, "UNAUTHENTICATED", extensions);

    Object.defineProperty(this, "name", { value: "AuthenticationError" });
  }
}

export class AuthorizationError extends GraphqlError {
  constructor(message: string, extensions?: Record<string, any>) {
    super(message, "UNAUTHORIZED", extensions);

    Object.defineProperty(this, "name", { value: "AuthorizationError" });
  }
}
