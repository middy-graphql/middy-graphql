<div align="center">
  <img alt="Middy logo" src="./img/logo.png"/>
</div>

<div align="center">
  <p><strong>The stylish Graphql middleware engine for Node.js</strong></p>
</div>

<div align="center">
<p>
  <a href="http://badge.fury.io/js/%40middy-graphql%2Fcore">
    <img src="https://badge.fury.io/js/%40middy-graphql%2Fcore.svg" alt="npm version" style="max-width:100%;">
  </a>
</p>
</div>

## What is Middy-Graphql

Middy-Graphql is a very simple and light middleware engine that allows you to simplify your graphql code when using Node.js.

Middy-Graphql is inspired by [middy](https://github.com/middyjs/middy#readme).

## Install

To install middy-graphql, you can use NPM or yarn:

```bash
npm install --save @middy-graphql/core
yarn add @middy-graphql/core
```

## Quick example

Code is better than 10,000 words, so let's jump into an example.
Let's assume you are building a JSON API to process a payment:

```typescript
//# mutation.js #
import Joi from "joi";
import middy, { Resolver } from "@middy-graphql/core";
import validatorMiddleware from "@middy-graphql/validator";

type Args = {
  input: {
    username: string
    password: string
  };
};

const inputSchema = Joi.object({
  input: Joi.object({
    username: joi.string().alphanum().required(),
    password: joi
      .string()
      .pattern(
        /^.*(?=.{8,30})((?=.*[![@#$%?`~|\\/'"^\]&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/
      )
      .required()
  }),
});

// Resolver<Root, Args, Context, Info>
const resolver: Resolver<any, Args, Context> = async ({ args, context, root, info }) => {
  const { username, password } = args.input

  // Create a user and save to your database
  // const user = .....

  return user
};

export default middy(resolver)
  .use(validatorMiddleware({ inputSchema }));

```

## Usage

As you might have already seen from our first example here, using middy-graphql is very
simple and requires just few steps:

Example:

```javascript
import middy from '@middy-graphql/core'
import middleware1 from 'sample-middleware1'
import middleware2 from 'sample-middleware2'
import middleware3 from 'sample-middleware3'

const resolver = async ({ root, context, info, args }) => {
  /* your business logic */
}

const resolver = middy(resolver)

resolver
  .use(middleware1())
  .use(middleware2())
  .use(middleware3())

export default resolver
```

`.use()` takes a single middleware or an array of middlewares, so you can attach multiple middlewares in a single call:

```javascript
import middy from "@middy/core";
import middleware1 from "sample-middleware1";
import middleware2 from "sample-middleware2";
import middleware3 from "sample-middleware3";
const middlewares = [middleware1(), middleware2(), middleware3()]

const resolver = async ({ root, context, info, args }) => {
  /* your business logic */
}

const resolver = middy(resolver)

resolver
  .use(middlewares)

export default resolver
```

You can also attach [inline middlewares](#inline-middlewares) by using the functions `.before`, `.after` and `.onError`.

For a more detailed use case and examples check the [Writing a middleware section](#writing-a-middleware).

## How it works

Middy implements the classic _onion-like_ middleware pattern, with some peculiar details.

![Middy middleware engine diagram](https://github.com/middyjs/middy/raw/main/docs/img/middy-middleware-engine.png)

When you attach a new middleware this will wrap the business logic contained in the handler
in two separate steps.

When another middleware is attached this will wrap the handler again and it will be wrapped by
all the previously added middlewares in order, creating multiple layers for interacting with
the _request_ (event) and the _response_.

This way the _request-response cycle_ flows through all the middlewares, the
handler and all the middlewares again, giving the opportunity within every step to
modify or enrich the current request, context, or the response.

### Execution order

Middlewares have two phases: `before` and `after`.

The `before` phase, happens _before_ the handler is executed. In this code the
response is not created yet, so you will have access only to the request.

The `after` phase, happens _after_ the handler is executed. In this code you will
have access to both the request and the response.

If you have three middlewares attached (as in the image above), this is the expected
order of execution:

- `middleware1` (before)
- `middleware2` (before)
- `middleware3` (before)
- `handler`
- `middleware3` (after)
- `middleware2` (after)
- `middleware1` (after)

Notice that in the `after` phase, middlewares are executed in inverted order,
this way the first handler attached is the one with the highest priority as it will
be the first able to change the request and last able to modify the response before
it gets sent to the user.

[Reference - https://github.com/middyjs/middy#how-it-works](https://github.com/middyjs/middy#how-it-works).

### Inline middlewares

Sometimes you want to create handlers that serve a very small need and that are not
necessarily re-usable. In such cases, you probably will need to hook only into one of
the different phases (`before`, `after` or `onError`).

In these cases you can use **inline middlewares** which are shortcut functions to hook
logic into Middy-Graphql's control flow.

Let's see how inline middlewares work with a simple example:

```javascript
import middy from '@middy-graphql/core'

const resolver = middy(() => {
  // do stuff
})

resolver.before(async (request) => {
  // do something in the before phase
})

resolver.after(async (request) => {
  // do something in the after phase
})

resolver.onError(async (request) => {
  // do something in the on error phase
})

export default resolver
```

As you can see above, a middy instance also exposes the `before`, `after` and `onError`
methods to allow you to quickly hook in simple inline middlewares.

### More details on creating middlewares

Check the [code for existing middlewares](/packages) to see more examples on how to write a middleware.


## TypeScript

Middy-Graphql can be used with TypeScript with typings built in in every official package.

Here's an example of how you might be using Middy with TypeScript.

```typescript
import middy, { Resolver } from "@middy-graphql/core";

const resolver: Resolver<any, Args, Context> = async ({ args, context, root, info }) => {
  // Do stuff
};

export default middy(resolver)
```

And here's an example of how you can write a custom middleware.

```typescript
import middy, { Request, Resolver } from "@middy-graphql/core";

type Args = { ... }
type Context = { ... }

export default middy(resolver)
  .use({
    before: ({ args, context }: Request<any, Args, Context>) => {
      // Do stuff
    },
  })
  .use(() => {
    const before = ({ args, context }: Request<any, Args, Context>) => {
      // Do stuff
    };

    const after = ({ args, context }: Request<any, Args, Context>) => {
      // Do stuff
    };

    return {
      before,
      after
    }
  })
```

## Available middlewares

- [@middy-graphql/validator](https://www.npmjs.com/package/@middy-graphql/validator): Joi validator