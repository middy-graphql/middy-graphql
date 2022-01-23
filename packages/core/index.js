function middy(baseResolver) {
  const beforeMiddlewares = [];
  const afterMiddlewares = [];
  const onErrorMiddlewares = [];

  function resolver(root, args, context, info) {
    return execute(
      { root, args, context, info },
      beforeMiddlewares,
      baseResolver,
      afterMiddlewares,
      onErrorMiddlewares
    );
  }

  resolver.use = function (middlewares) {
    if (Array.isArray(middlewares)) {
      for (const middleware of middlewares) {
        resolver.applyMiddleware(middleware);
      }

      return resolver;
    }

    return resolver.applyMiddleware(middlewares);
  };

  resolver.applyMiddleware = function (middleware = {}) {
    const { before, after, onError } = middleware;

    if (!before && !after && !onError) {
      throw new Error(
        'Middleware must be an object containing at least one key among "before", "after", "onError"'
      );
    }

    if (before) resolver.before(before);
    if (after) resolver.after(after);
    if (onError) resolver.onError(onError);

    return resolver;
  };

  // Inline Middlewares
  resolver.before = function (beforeMiddleware) {
    beforeMiddlewares.push(beforeMiddleware);
    return resolver;
  };
  resolver.after = function (afterMiddleware) {
    afterMiddlewares.unshift(afterMiddleware);
    return resolver;
  };
  resolver.onError = function (onErrorMiddleware) {
    onErrorMiddlewares.push(onErrorMiddleware);
    return resolver;
  };

  resolver.__middlewares = {
    before: beforeMiddlewares,
    after: afterMiddlewares,
    onError: onErrorMiddlewares,
  };

  return resolver;
}

async function execute(
  request,
  beforeMiddlewares,
  baseResolver,
  afterMiddlewares,
  onErrorMiddlewares
) {
  try {
    await runMiddlewares(request, beforeMiddlewares);

    // Check if before stack hasn't exit early
    if (request.response === undefined) {
      request.response = await baseResolver(request);

      await runMiddlewares(request, afterMiddlewares);
    }
  } catch (e) {
    // Reset response changes made by after stack before error thrown
    request.response = undefined;
    request.error = e;

    if (onErrorMiddlewares.length === 0) {
      throw e;
    }

    try {
      await runMiddlewares(request, onErrorMiddlewares);
    } catch (e) {
      throw e;
    }
  }

  return request.response;
}

async function runMiddlewares(request, middlewares) {
  for (const middleware of middlewares) {
    const res = await middleware?.(request);

    if (res !== undefined) {
      request.response = res;

      return;
    }
  }
}

module.exports = middy;
