const test = require('ava')
const middy = require('../index')

test('Middleware attached with "use" must be an object or array[object]', async t => {
  const handler = middy()

  let error = t.throws(() => {
    handler.use(() => {})
  })
  t.is(
    error.message,
    'Middleware must be an object containing at least one key among "before", "after", "onError"'
  )

  error = t.throws(() => {
    handler.use({ foo: 'bar' })
  })
  t.is(
    error.message,
    'Middleware must be an object containing at least one key among "before", "after", "onError"'
  )

  error = t.throws(() => {
    handler.use(['before'])
  })
  t.is(
    error.message,
    'Middleware must be an object containing at least one key among "before", "after", "onError"'
  )
})

test('"use" can add single before middleware', async t => {
  const handler = middy()
  const before = () => {}
  const middleware = () => ({ before })
  handler.use(middleware())
  t.is(handler.__middlewares.before[0], before)
})

test('"use" can add single after middleware', async t => {
  const handler = middy()
  const after = () => {}
  const middleware = () => ({ after })
  handler.use(middleware())
  t.is(handler.__middlewares.after[0], after)
})

test('"use" can add single onError middleware', async t => {
  const handler = middy()
  const onError = () => {}
  const middleware = () => ({ onError })
  handler.use(middleware())
  t.is(handler.__middlewares.onError[0], onError)
})

test('"use" can add single object with all types of middlewares', async t => {
  const handler = middy()
  const before = () => {}
  const after = () => {}
  const onError = () => {}
  const middleware = () => ({ before, after, onError })
  handler.use(middleware())
  t.is(handler.__middlewares.before[0], before)
  t.is(handler.__middlewares.after[0], after)
  t.is(handler.__middlewares.onError[0], onError)
})

test('"use" can add multiple before middleware', async t => {
  const handler = middy(() => {})
  const before = () => {}
  const middleware = () => ({ before })
  handler.use([middleware(), middleware()])
  t.is(handler.__middlewares.before[0], before)
  t.is(handler.__middlewares.before[1], before)
})

test('"use" can add multiple after middleware', async t => {
  const handler = middy(() => {})
  const after = () => {}
  const middleware = () => ({ after })
  handler.use([middleware(), middleware()])
  t.is(handler.__middlewares.after[0], after)
  t.is(handler.__middlewares.after[1], after)
})

test('"use" can add multiple onError middleware', async t => {
  const handler = middy(() => {})
  const onError = () => {}
  const middleware = () => ({ onError })
  handler.use([middleware(), middleware()])
  t.is(handler.__middlewares.onError[0], onError)
  t.is(handler.__middlewares.onError[1], onError)
})

test('"use" can add multiple object with all types of middlewares', async t => {
  const handler = middy(() => {})
  const before = () => {}
  const after = () => {}
  const onError = () => {}
  const middleware = () => ({ before, after, onError })
  handler.use([middleware(), middleware()])
  t.is(handler.__middlewares.before[0], before)
  t.is(handler.__middlewares.after[0], after)
  t.is(handler.__middlewares.onError[0], onError)
  t.is(handler.__middlewares.before[1], before)
  t.is(handler.__middlewares.after[1], after)
  t.is(handler.__middlewares.onError[1], onError)
})

test('"before" should add a before middleware', async t => {
  const handler = middy()
  const before = () => {}

  handler.before(before)
  t.is(handler.__middlewares.before[0], before)
})

test('"after" should add a before middleware', async t => {
  const handler = middy()
  const after = () => {}

  handler.after(after)
  t.is(handler.__middlewares.after[0], after)
})

test('"onError" should add a before middleware', async t => {
  const handler = middy()
  const onError = () => {}

  handler.onError(onError)
  t.is(handler.__middlewares.onError[0], onError)
})

test('It should execute before and after middlewares in the right order', async t => {
  const handler = middy(() => {
    return { foo: 'bar' }
  })

  const executedBefore = []
  const executedAfter = []

  const m1 = () => ({
    before: () => {
      executedBefore.push('m1')
    },
    after: () => {
      executedAfter.push('m1')
    },
  })

  const m2 = () => ({
    before: () => {
      executedBefore.push('m2')
    },
    after: () => {
      executedAfter.push('m2')
    },
  })

  handler.use(m1()).use(m2())

  // executes the handler
  const response = await handler()
  t.deepEqual(executedBefore, ['m1', 'm2'])
  t.deepEqual(executedAfter, ['m2', 'm1'])
  t.deepEqual(response, { foo: 'bar' })
})

test('"before" middlewares should be able to change response', async t => {
  const handler = middy(() => {
    return { foo: 'bar' }
  })

  const m = request => {
    request.response = { bar: 'foo' }
  }

  handler.before(m)

  const res = await handler()

  t.deepEqual(res, { bar: 'foo' })
})
