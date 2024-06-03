import { createPagesFunctionHandler } from '@remix-run/cloudflare-pages';
import * as build from '@remix-run/dev/server-build';

const handleRequest = createPagesFunctionHandler({
  build,
  mode: process.env.NODE_ENV,
});

export function onRequest(ctx: EventContext<any, any, any>) {
  return handleRequest(ctx);
}
