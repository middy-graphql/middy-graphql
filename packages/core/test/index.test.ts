import middy from "../index";

describe("Core", () => {
  it('should throw an error if invalid value passed to "use"', () => {
    const handler = middy(() => {});

    let middleware: any = () => {};

    try {
      handler.use(middleware());
    } catch (err: any) {
      expect(err.message).toBe(
        'Middleware must be an object containing at least one key among "before", "after", "onError"'
      );
    }

    middleware = { foo: "bar " };

    try {
      handler.use(middleware);
    } catch (err: any) {
      expect(err.message).toBe(
        'Middleware must be an object containing at least one key among "before", "after", "onError"'
      );
    }

    middleware = ["foo"];

    try {
      handler.use(middleware);
    } catch (err: any) {
      expect(err.message).toBe(
        'Middleware must be an object containing at least one key among "before", "after", "onError"'
      );
    }
  });

  it('"use" can add single before middleware', () => {
    const handler = middy(() => {});
    const before = () => {};
    const middleware = () => ({ before });
    handler.use(middleware());

    expect(handler.__middlewares.before[0]).toEqual(before);
  });

  it('"use" can add single after middleware', () => {
    const handler = middy(() => {});
    const after = () => {};
    const middleware = () => ({ after });
    handler.use(middleware());

    expect(handler.__middlewares.after[0]).toEqual(after);
  });

  it('"use" can add single onError middleware', () => {
    const handler = middy(() => {});
    const onError = () => {};
    const middleware = () => ({ onError });
    handler.use(middleware());

    expect(handler.__middlewares.onError[0]).toEqual(onError);
  });
});
