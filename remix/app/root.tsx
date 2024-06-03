import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import "@cloudflare/cloudflare-brand-assets/css/components/error-page.css"
import "@cloudflare/cloudflare-brand-assets/css/components/number.css"
import "@cloudflare/cloudflare-brand-assets/css/components/superscript.css"
import "@cloudflare/cloudflare-brand-assets/css/components/link.css"
import "@cloudflare/cloudflare-brand-assets/css/components/button.css"
import "@cloudflare/cloudflare-brand-assets/css/components/inline-code.css"
import "@cloudflare/cloudflare-brand-assets/css/components/code-block.css"
import "@cloudflare/cloudflare-brand-assets/css/components/markdown-lite.css"
import "@cloudflare/cloudflare-brand-assets/css/components/unordered-list-workers-themed.css"

const loadTheme = `
  (function() {
    const setTheme = (theme) => {
      document.documentElement.setAttribute("theme", theme);
      localStorage.theme = theme;
    }

    const query = window.matchMedia("(prefers-color-scheme: dark)");
    query.addEventListener("change", () => {
      setTheme(query.matches ? "dark" : "light");
    });

    if (["dark", "light"].includes(localStorage.theme)) {
      setTheme(localStorage.theme);
    } else {
      setTheme(query.matches ? "dark" : "light");
    }
  })();
`;

const setDomainAttr = `
  document.documentElement.setAttribute('domain', document.domain)
`

export function Layout({ children }: { children: React.ReactNode }) {
  const escapedLoadTheme = loadTheme.replace(/"/g, '\\"');

  const env = process.env.NODE_ENV
  const cookieScript =
    env === "production" ? (
      <>
        <script
          type="text/javascript"
          src="https://cdn.cookielaw.org/consent/316fefa6-e079-422c-b2be-31e41b337bad/OtAutoBlock.js"
        ></script>
        <script
          src="https://cdn.cookielaw.org/scripttemplates/otSDKStub.js"
          type="text/javascript"
          charSet="UTF-8"
          data-domain-script="316fefa6-e079-422c-b2be-31e41b337bad"
        ></script>
        <script type="text/javascript">function OptanonWrapper() {}</script>
      </>
    ) : (
      <>
        <script
          type="text/javascript"
          src="https://cdn.cookielaw.org/consent/316fefa6-e079-422c-b2be-31e41b337bad-test/OtAutoBlock.js"
        ></script>
        <script
          src="https://cdn.cookielaw.org/scripttemplates/otSDKStub.js"
          type="text/javascript"
          charSet="UTF-8"
          data-domain-script="316fefa6-e079-422c-b2be-31e41b337bad-test"
        ></script>
        <script type="text/javascript">function OptanonWrapper() {}</script>
      </>
    )

  return (
    <html lang="en" theme="light" suppressHydrationWarning={true}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <script type="text/javascript" dangerouslySetInnerHTML={{ __html: setDomainAttr }} />
        <script type="text/javascript" dangerouslySetInnerHTML={{ __html: loadTheme }} />
        {cookieScript}
        <script type="text/javascript" async="" src="https://www.googletagmanager.com/gtag/destination?id=DC-9309168&l=cfDataLayer&cx=c"></script>
        <script 
          dangerouslySetInnerHTML={{__html:`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GTM-PKQFGQB');
          `}}>
        </script>
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
