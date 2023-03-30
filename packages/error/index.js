const { GraphQLError } = require('graphql')

class InternalError extends GraphQLError {
  constructor(message = 'Internal server error.', extensions) {
    super(message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
        ...extensions,
      },
    })
  }
}

class ValidationError extends GraphQLError {
  constructor(
    message = 'Validation error(s) present. See extensions for more details.',
    extensions
  ) {
    super(message, {
      extensions: {
        code: 'VALIDATION_ERROR',
        ...extensions,
      },
    })
  }
}

class ForbiddenError extends GraphQLError {
  constructor(message = 'Forbidden', extensions) {
    super(message, {
      extensions: {
        code: 'FORBIDDEN',
        ...extensions,
      },
    })
  }
}

class NotFoundError extends GraphQLError {
  constructor(message = 'Not Found', extensions) {
    super(message, {
      extensions: {
        code: 'NOT_FOUND',
        ...extensions,
      },
    })
  }
}

class BadRequestError extends GraphQLError {
  constructor(message = 'Bad Request', extensions) {
    super(message, {
      extensions: {
        code: 'BAD_REQUEST',
        ...extensions,
      },
    })
  }
}

class TooManyRequestsError extends GraphQLError {
  constructor(message = 'Too Many Requests', extensions) {
    super(message, {
      extensions: {
        code: 'TOO_MANY_REQUESTS',
        ...extensions,
      },
    })
  }
}

class ConflictError extends GraphQLError {
  constructor(message = 'Conflict Request', extensions) {
    super(message, {
      extensions: {
        code: 'CONFLICT',
        ...extensions,
      },
    })
  }
}

class PaymentRequiredError extends GraphQLError {
  constructor(message = 'Payment Required', extensions) {
    super(message, {
      extensions: {
        code: 'PAYMENT_REQUIRED',
        ...extensions,
      },
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
  PaymentRequiredError,
}
