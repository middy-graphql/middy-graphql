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
  constructor(
    message = 'Oops, something went wrong! Our engineers have been alerted and will fix this asap.',
    extensions
  ) {
    super(message, 'INTERNAL_SERVER_ERROR', extensions)

    Object.defineProperty(this, 'INTERNAL_SERVER_ERROR', {
      value: 'InternalError',
    })
  }
}

class ValidationError extends GraphqlError {
  constructor(
    message = 'Validation error(s) present. See extensions for more details.',
    extensions
  ) {
    super(message, 'VALIDATION_ERROR', extensions)

    Object.defineProperty(this, 'VALIDATION_ERROR')
  }
}

class ForbiddenError extends GraphqlError {
  constructor(message = 'Forbidden', extensions) {
    super(message, 'FORBIDDEN_ERROR', extensions)

    Object.defineProperty(this, 'FORBIDDEN_ERROR')
  }
}

class NotFoundError extends GraphqlError {
  constructor(message = 'Not Found', extensions) {
    super(message, 'NOT_FOUND', extensions)

    Object.defineProperty(this, 'NOT_FOUND')
  }
}

module.exports = {
  GraphqlError,
  ForbiddenError,
  ValidationError,
  InternalError,
  NotFoundError,
}
