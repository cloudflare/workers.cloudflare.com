const errorHandler = async ({ next }: EventContext<any, any, any>) => {
  try {
    return await next();
  } catch (err) {
    if (err instanceof Error) {
      return new Response(`${err.message}\n${err.stack}`, { status: 500 });
    }

    return new Response(`Internal Server Error:\n${JSON.stringify(err)}`, {
      status: 500,
    });
  }
};

export const onRequest = [errorHandler];
