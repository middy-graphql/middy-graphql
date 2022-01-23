const test = require('ava')
const {
  AuthorizationError,
  AuthenticationError,
  InternalError,
  InputError,
  ValidationError,
} = require('../index.js')

test('should throw "AuthorizationError"', async t => {
  let error = t.throws(() => {
    throw new AuthorizationError('AuthorizationError')
  })

  t.is(error.name, 'AuthorizationError')
  t.is(error.message, 'AuthorizationError')
})

test('should throw "AuthenticationError"', async t => {
  let error = t.throws(() => {
    throw new AuthenticationError('AuthenticationError')
  })

  t.is(error.name, 'AuthenticationError')
  t.is(error.message, 'AuthenticationError')
})

test('should throw "InternalError"', async t => {
  let error = t.throws(() => {
    throw new InternalError('InternalError')
  })

  t.is(error.name, 'InternalError')
  t.is(error.message, 'InternalError')
})

test('should throw "InputError"', async t => {
  let error = t.throws(() => {
    throw new InputError('InputError')
  })

  t.is(error.name, 'InputError')
  t.is(error.message, 'InputError')
})

test('should throw "ValidationError"', async t => {
  let error = t.throws(() => {
    throw new ValidationError('ValidationError', { path: 'name' })
  })

  t.is(error.name, 'ValidationError')
  t.is(error.message, 'ValidationError')
  t.is(error.extensions.code, 'GRAPHQL_VALIDATION_FAILED')
  t.is(error.extensions.path, 'name')
})
