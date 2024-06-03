import Layout from "../components/layout"
import "@cloudflare/cloudflare-brand-assets/css/components/error-page.css"

export function loader() {
  return new Response("Not Found", {
    status: 404,
  });
}

export default function NotFoundPage() {
  return (
    <div className="ErrorPage">
      <div className="ErrorPage--content">
        <h1 className="ErrorPage--title">Not found</h1>
        <p className="ErrorPage--description">
          Unfortunately, the page you requested cannot be found.
        </p>
        <div className="ErrorPage--action">
          <a className="Button Button-is-primary" href="/">
            Home
          </a>
        </div>
      </div>
    </div>
  )
}
