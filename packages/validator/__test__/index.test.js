const test = require('ava')
const middy = require('../../core')
const joi = require('joi')
const validator = require('../index.js')

test('It should validate an incoming object', async t => {
  const handler = middy(({ args }) => {
    return args.input
  })

  const inputSchema = joi.object({
    input: joi.object({
      string: joi.string().required(),
      boolean: joi.boolean().required(),
      integer: joi.number().integer().required(),
      number: joi.number().required(),
    }),
  })

  handler.use(
    validator({
      inputSchema,
    })
  )

  // invokes the handler
  const args = {
    input: {
      string: JSON.stringify({ foo: 'bar' }),
      boolean: true,
      integer: 0,
      number: 0.1,
    },
  }

  const input = await handler({}, args, {}, {})

  t.deepEqual(input, {
    boolean: true,
    number: 0.1,
    integer: 0,
    string: '{"foo":"bar"}',
  })
})

test('It should handle invalid schema as a ValidationError', async t => {
  const handler = middy(({ args }) => {
    return args.input
  })

  const inputSchema = joi.object({
    input: joi.object({
      string: joi.string().required(),
      boolean: joi.boolean().required(),
      integer: joi.number().integer().required(),
      number: joi.number().required().messages({
        'number.base': 'number must be a number',
      }),
    }),
  })

  handler.use(
    validator({
      inputSchema,
    })
  )

  // invokes the handler
  const args = {
    input: {
      string: JSON.stringify({ foo: 'bar' }),
      boolean: true,
      integer: 0,
      number: 'not a number',
    },
  }

  try {
    await handler({}, args, {}, {})
  } catch (error) {
    t.is(error.message, 'number must be a number')
    t.is(error.name, 'ValidationError')
    t.is(error.extensions.code, 'GRAPHQL_VALIDATION_FAILED')
    t.deepEqual(error.extensions.path, ['input', 'number'])
  }
})

test('It should validate response', async t => {
  const expectedResponse = {
    name: 'kyuhak yuk',
    email: 'kyuhakyuk@gmail.com',
  }

  const handler = middy(() => {
    return expectedResponse
  })

  const outputSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().required(),
  })

  handler.use(
    validator({
      outputSchema,
    })
  )

  const response = await handler()

  t.deepEqual(response, expectedResponse)
})

test('It should make requests with invalid responses fail with an ValidationError', async t => {
  const expectedResponse = {
    name: 'kyuhak yuk',
    email: 'kyuhakyuk@gmail.com',
  }

  const handler = middy(() => {
    return expectedResponse
  })

  const outputSchema = joi.object({
    name: joi.string().required(),
    age: joi.number().required(),
  })

  handler.use(
    validator({
      outputSchema,
    })
  )

  let response

  try {
    response = await handler()
  } catch (error) {
    t.is(error.name, 'ValidationError')
    t.is(error.extensions.code, 'GRAPHQL_VALIDATION_FAILED')
    t.deepEqual(error.extensions.path, ['age'])
  }
})
