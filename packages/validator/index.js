const { ValidationError } = require('@middy-graphql/error')
const flatten = require('lodash.flatten')
const compact = require('lodash.compact')

function validator(schema) {
  async function before(request) {
    const requestData = {
      args: request.args,
    }

    const errors = Object.keys(schema).map(key => {
      const validationResult = schema[key].validate(requestData[key], {
        abortEarly: false,
        convert: true,
      })

      return validationResult.error?.details.map(detail => ({
        message: detail.message,
        label: detail.context.label,
        key: detail.context.key,
        value: detail.context.value,
      }))
    })

    const flattenedErrors = flatten(errors)

    if (compact(flattenedErrors).length > 0) {
      throw new ValidationError(undefined, flattenedErrors)
    }
  }

  return {
    before,
  }
}

module.exports = validator
