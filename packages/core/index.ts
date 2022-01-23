import { GraphQLError, GraphQLResolveInfo } from "graphql";

export default function middyfy(baseResolver: Resolver) {
  const beforeMiddlewares: MiddlewareFn[] = [];
  const afterMiddlewares: MiddlewareFn[] = [];
  const onErrorMiddlewares: MiddlewareFn[] = [];

  function resolver(root: any, args: any, context: any, info: GraphQLResolveInfo) {
    return execute(
      { root, args, context, info },
      beforeMiddlewares,
      baseResolver,
      afterMiddlewares,
      onErrorMiddlewares
    );
  }

  resolver.use = function (middlewares: MiddlewareObj | MiddlewareObj[]) {
    if (Array.isArray(middlewares)) {
      for (const middleware of middlewares) {
        resolver.applyMiddleware(middleware);
      }

      return resolver;
    }

    return resolver.applyMiddleware(middlewares);
  };

  resolver.applyMiddleware = function (middleware: MiddlewareObj = {}) {
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
  resolver.before = function (beforeMiddleware: MiddlewareFn) {
    beforeMiddlewares.push(beforeMiddleware);
    return resolver;
  };
  resolver.after = function (afterMiddleware: MiddlewareFn) {
    afterMiddlewares.unshift(afterMiddleware);
    return resolver;
  };
  resolver.onError = function (onErrorMiddleware: MiddlewareFn) {
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
  request: Request,
  beforeMiddlewares: MiddlewareFn[],
  baseResolver: Resolver,
  afterMiddlewares: MiddlewareFn[],
  onErrorMiddlewares: MiddlewareFn[]
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
    request.error = e as GraphQLError;

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

async function runMiddlewares(request: Request, middlewares: MiddlewareFn[]) {
  for (const middleware of middlewares) {
    const res = await middleware?.(request);

    if (res !== undefined) {
      request.response = res;

      return;
    }
  }
}

export type Request<TRoot = any, TArgs = any, ContextType = any, TResult = any> = ResolverData<
  TRoot,
  TArgs,
  ContextType
> & {
  response?: TResult;
  error?: GraphQLError;
};

export type MiddlewareFn<TRoot = any, TArgs = any, TContext = any, TResult = any> = (
  data: Request<TRoot, TArgs, TContext, TResult>
) => TResult;

export interface MiddlewareObj<TRoot = any, TArgs = any, TContext = any, TResult = any> {
  before?: MiddlewareFn<TRoot, TArgs, TContext, TResult>;
  after?: MiddlewareFn<TRoot, TArgs, TContext, TResult>;
  onError?: MiddlewareFn<TRoot, TArgs, TContext, TResult>;
}

export type Resolver<TRoot = any, TArgs = any, TContext = any, TResult = any> = (
  data: ResolverData<TRoot, TArgs, TContext>
) => TResult;

export interface ResolverData<TRoot, TArgs, TContext> {
  root: TRoot;
  args: TArgs;
  context: TContext;
  info: GraphQLResolveInfo;
}
