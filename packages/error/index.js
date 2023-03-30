const { GraphQLError } = require('graphql')

class InternalError extends GraphQLError {
  constructor(message = 'Internal server error.', extensions) {
    super(message, {
      code: 'INTERNAL_SERVER_ERROR',
      ...extensions,
    })
  }
}

class ValidationError extends GraphQLError {
  constructor(
    message = 'Validation error(s) present. See extensions for more details.',
    extensions
  ) {
    super(message, {
      code: 'VALIDATION_ERROR',
      ...extensions,
    })
  }
}

class ForbiddenError extends GraphQLError {
  constructor(message = 'Forbidden', extensions) {
    super(message, {
      code: 'FORBIDDEN',
      ...extensions,
    })
  }
}

class NotFoundError extends GraphQLError {
  constructor(message = 'Not Found', extensions) {
    super(message, {
      code: 'NOT_FOUND',
      ...extensions,
    })
  }
}

class BadRequestError extends GraphQLError {
  constructor(message = 'Bad Request', extensions) {
    super(message, {
      code: 'BAD_REQUEST',
      ...extensions,
    })
  }
}

class TooManyRequestsError extends GraphQLError {
  constructor(message = 'Too Many Requests', extensions) {
    super(message, {
      code: 'TOO_MANY_REQUESTS',
      ...extensions,
    })
  }
}

class ConflictError extends GraphQLError {
  constructor(message = 'Conflict Request', extensions) {
    super(message, {
      code: 'CONFLICT',
      ...extensions,
    })
  }
}

module.exports = {
  GraphQLError,
  ConflictError,
  ForbiddenError,
  TooManyRequestsError,
  ValidationError,
  InternalError,
  NotFoundError,
  BadRequestError,
}
