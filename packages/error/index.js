const { ApolloError } = require('apollo-server-errors')

class InternalError extends ApolloError {
  constructor(
    message = 'Oops, something went wrong! Our engineers have been alerted and will fix this asap.',
    extensions
  ) {
    super(message, 'INTERNAL_SERVER_ERROR', extensions)
  }
}

class ValidationError extends ApolloError {
  constructor(
    message = 'Validation error(s) present. See extensions for more details.',
    extensions
  ) {
    super(message, 'VALIDATION_ERROR', extensions)
  }
}

class ForbiddenError extends ApolloError {
  constructor(message = 'Forbidden', extensions) {
    super(message, 'FORBIDDEN_ERROR', extensions)
  }
}

class NotFoundError extends ApolloError {
  constructor(message = 'Not Found', extensions) {
    super(message, 'NOT_FOUND', extensions)
  }
}

class BadRequestError extends ApolloError {
  constructor(message = 'Bad Request', extensions) {
    super(message, 'BAD_REQUEST', extensions)
  }
}

module.exports = {
  ApolloError,
  ForbiddenError,
  ValidationError,
  InternalError,
  NotFoundError,
  BadRequestError,
}
