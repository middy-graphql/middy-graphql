import { GraphQLError, GraphQLResolveInfo } from 'graphql'
import { Request as ExpressRequest, Response as ExpressResponse } from 'express'
declare function middy(baseResolver: Resolver): {
  (root: any, args: any, context: any, info: GraphQLResolveInfo): Promise<any>
  use(middlewares: MiddlewareObj | MiddlewareObj[]): any
  applyMiddleware(middleware?: MiddlewareObj): any
  before(beforeMiddleware: MiddlewareFn): any
  after(afterMiddleware: MiddlewareFn): any
  onError(onErrorMiddleware: MiddlewareFn): any
  __middlewares: {
    before: MiddlewareFn<any, any, any, any>[]
    after: MiddlewareFn<any, any, any, any>[]
    onError: MiddlewareFn<any, any, any, any>[]
  }
}
export declare interface Context {
  [key: string]: any
  req: ExpressRequest
  res: ExpressResponse
}
export declare type Request<
  TRoot = any,
  TArgs = any,
  ContextType = Context,
  TResult = any
> = ResolverData<TRoot, TArgs, ContextType> & {
  response?: TResult
  error?: GraphQLError
}
export declare type MiddlewareFn<
  TRoot = any,
  TArgs = any,
  TContext = Context,
  TResult = any
> = (data: Request<TRoot, TArgs, TContext, TResult>) => TResult
export interface MiddlewareObj<
  TRoot = any,
  TArgs = any,
  TContext = Context,
  TResult = any
> {
  before?: MiddlewareFn<TRoot, TArgs, TContext, TResult>
  after?: MiddlewareFn<TRoot, TArgs, TContext, TResult>
  onError?: MiddlewareFn<TRoot, TArgs, TContext, TResult>
}
export declare type Resolver<
  TRoot = any,
  TArgs = any,
  TContext = Context,
  TResult = any
> = (data: ResolverData<TRoot, TArgs, TContext>) => TResult
export interface ResolverData<TRoot, TArgs, TContext = Context> {
  root: TRoot
  args: TArgs
  context: TContext
  info: GraphQLResolveInfo
}
export default middy
