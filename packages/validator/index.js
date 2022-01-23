const { ValidationError } = require('@middy-graphql/error')

function validatorMiddleware(options = {}) {
  const { inputSchema, outputSchema } = options

  const validatorMiddlewareBefore = request => {
    const { error } = inputSchema.validate(request.args)

    if (error) {
      const { message, path } = errorParser(error)

      throw new ValidationError(message, { path })
    }
  }

  const validatorMiddlewareAfter = request => {
    const { error } = outputSchema.validate(request.response)

    if (error) {
      const { message, path } = errorParser(error)

      throw new ValidationError(message, { path })
    }
  }
  return {
    before: inputSchema ? validatorMiddlewareBefore : undefined,
    after: outputSchema ? validatorMiddlewareAfter : undefined,
  }
}

function errorParser(error) {
  const { message, path } = error.details[0]

  return {
    message,
    path,
  }
}

module.exports = validatorMiddleware
