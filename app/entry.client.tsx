/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */

import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";

import "@cloudflare/cloudflare-brand-assets/css/global/box-sizing.css"
import "@cloudflare/cloudflare-brand-assets/css/global/element-normalization.css"
import "@cloudflare/cloudflare-brand-assets/css/global/sizes-variables.css"
import "@cloudflare/cloudflare-brand-assets/css/global/font-variables.css"
import "@cloudflare/cloudflare-brand-assets/css/global/brand-color-variables.css"
import "@cloudflare/cloudflare-brand-assets/css/global/theme-color-variables.css"
import "@cloudflare/cloudflare-brand-assets/css/global/theme-helpers.css"
import "@cloudflare/cloudflare-brand-assets/css/global/selection-color.css"
import "@cloudflare/cloudflare-brand-assets/css/global/html.css"

import "@cloudflare/cloudflare-brand-assets/css/helpers/desktop-and-mobile-only.css"
import "@cloudflare/cloudflare-brand-assets/css/helpers/is-smooth-scrolling.css"
import "@cloudflare/cloudflare-brand-assets/css/helpers/is-visually-hidden.css"
import "@cloudflare/cloudflare-brand-assets/css/helpers/with-styled-webkit-scrollbars.css"

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <RemixBrowser />
    </StrictMode>
  );
});
