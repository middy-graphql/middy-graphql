import { GraphQLError, GraphQLResolveInfo } from "graphql";
declare function middy(baseResolver: Resolver): {
  (root: any, args: any, context: any, info: GraphQLResolveInfo): Promise<any>;
  use(middlewares: MiddlewareObj | MiddlewareObj[]): any;
  applyMiddleware(middleware?: MiddlewareObj): any;
  before(beforeMiddleware: MiddlewareFn): any;
  after(afterMiddleware: MiddlewareFn): any;
  onError(onErrorMiddleware: MiddlewareFn): any;
  __middlewares: {
    before: MiddlewareFn<any, any, any, any>[];
    after: MiddlewareFn<any, any, any, any>[];
    onError: MiddlewareFn<any, any, any, any>[];
  };
};
export declare type Request<
  TRoot = any,
  TArgs = any,
  ContextType = any,
  TResult = any
> = ResolverData<TRoot, TArgs, ContextType> & {
  response?: TResult;
  error?: GraphQLError;
};
export declare type MiddlewareFn<TRoot = any, TArgs = any, TContext = any, TResult = any> = (
  data: Request<TRoot, TArgs, TContext, TResult>
) => TResult;
export interface MiddlewareObj<TRoot = any, TArgs = any, TContext = any, TResult = any> {
  before?: MiddlewareFn<TRoot, TArgs, TContext, TResult>;
  after?: MiddlewareFn<TRoot, TArgs, TContext, TResult>;
  onError?: MiddlewareFn<TRoot, TArgs, TContext, TResult>;
}
export declare type Resolver<TRoot = any, TArgs = any, TContext = any, TResult = any> = (
  data: ResolverData<TRoot, TArgs, TContext>
) => TResult;
export interface ResolverData<TRoot, TArgs, TContext> {
  root: TRoot;
  args: TArgs;
  context: TContext;
  info: GraphQLResolveInfo;
}
export default middy;
