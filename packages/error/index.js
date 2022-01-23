const { GraphQLError: BaseGraphQLError, formatError } = require('graphql')

class GraphqlError extends Error {
  extensions
  name
  locations
  path
  source
  positions
  nodes
  originalError

  constructor(message, code, extensions) {
    super(message)

    this.extensions = {
      code,
      ...extensions,
    }
  }

  toJSON() {
    return formatError(toGraphQLError(this))
  }

  get [Symbol.toStringTag]() {
    return this.name
  }
}

function toGraphQLError(error) {
  return new BaseGraphQLError(
    error.message,
    error.nodes,
    error.source,
    error.positions,
    error.path,
    error.originalError,
    error.extensions
  )
}

class InternalError extends GraphqlError {
  constructor(message, extensions) {
    super(message, 'INTERNAL_SERVER_ERROR', extensions)

    Object.defineProperty(this, 'name', { value: 'InternalError' })
  }
}

class InputError extends GraphqlError {
  constructor(message, extensions) {
    super(message, 'BAD_REQUEST', extensions)

    Object.defineProperty(this, 'name', { value: 'InputError' })
  }
}

class ValidationError extends GraphqlError {
  constructor(message, extensions) {
    super(message, 'GRAPHQL_VALIDATION_FAILED', extensions)

    Object.defineProperty(this, 'name', { value: 'ValidationError' })
  }
}

class AuthenticationError extends GraphqlError {
  constructor(message, extensions) {
    super(message, 'UNAUTHENTICATED', extensions)

    Object.defineProperty(this, 'name', { value: 'AuthenticationError' })
  }
}

class AuthorizationError extends GraphqlError {
  constructor(message, extensions) {
    super(message, 'UNAUTHORIZED', extensions)

    Object.defineProperty(this, 'name', { value: 'AuthorizationError' })
  }
}

module.exports = {
  GraphqlError,
  AuthenticationError,
  AuthorizationError,
  InputError,
  ValidationError,
  InternalError,
}
