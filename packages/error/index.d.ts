import { ApolloError } from 'apollo-server-errors'

export declare class InternalError extends ApolloError {
  constructor(message?: string, extensions?: Record<string, any>)
}
export declare class ValidationError extends ApolloError {
  constructor(message?: string, extensions?: Record<string, any>)
}
export declare class ForbiddenError extends ApolloError {
  constructor(message?: string, extensions?: Record<string, any>)
}
export declare class NotFoundError extends ApolloError {
  constructor(message?: string, extensions?: Record<string, any>)
}
export declare class BadRequestError extends ApolloError {
  constructor(message?: string, extensions?: Record<string, any>)
}
export declare class TooManyRequestsError extends ApolloError {
  constructor(message?: string, extensions?: Record<string, any>)
}
export declare class ConflictError extends ApolloError {
  constructor(message?: string, extensions?: Record<string, any>)
}
