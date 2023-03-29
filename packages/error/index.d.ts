import { ApolloError as _ApolloError } from 'apollo-server-errors'

export declare class ApolloError extends _ApolloError {} 

export declare class InternalError extends _ApolloError {
  constructor(message?: string, extensions?: Record<string, any>)
}
export declare class ValidationError extends _ApolloError {
  constructor(message?: string, extensions?: Record<string, any>)
}
export declare class ForbiddenError extends _ApolloError {
  constructor(message?: string, extensions?: Record<string, any>)
}
export declare class NotFoundError extends _ApolloError {
  constructor(message?: string, extensions?: Record<string, any>)
}
export declare class BadRequestError extends _ApolloError {
  constructor(message?: string, extensions?: Record<string, any>)
}
export declare class TooManyRequestsError extends _ApolloError {
  constructor(message?: string, extensions?: Record<string, any>)
}
export declare class ConflictError extends _ApolloError {
  constructor(message?: string, extensions?: Record<string, any>)
}
