import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import "@cloudflare/cloudflare-brand-assets/css/components/error-page.css"

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
