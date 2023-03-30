import { GraphQLError as _GraphQLError } from 'graphql'

export declare class GraphQLError extends _GraphQLError {}

export declare class InternalError extends _GraphQLError {
  constructor(message?: string, extensions?: Record<string, any>)
}
export declare class ValidationError extends _GraphQLError {
  constructor(message?: string, extensions?: Record<string, any>)
}
export declare class ForbiddenError extends _GraphQLError {
  constructor(message?: string, extensions?: Record<string, any>)
}
export declare class NotFoundError extends _GraphQLError {
  constructor(message?: string, extensions?: Record<string, any>)
}
export declare class BadRequestError extends _GraphQLError {
  constructor(message?: string, extensions?: Record<string, any>)
}
export declare class TooManyRequestsError extends _GraphQLError {
  constructor(message?: string, extensions?: Record<string, any>)
}
export declare class ConflictError extends _GraphQLError {
  constructor(message?: string, extensions?: Record<string, any>)
}
