import React from 'react'
import { tw } from 'twind'
import ContentPage from "../components/content-page"
import Layout from "../components/layout"
import SEO from "../components/seo"

const WorksPage = () => {
  return (
    <Layout>
      <SEO title="Works on Workers" />

      <ContentPage
        description="The best packages and libraries supported by Cloudflare Workers, chosen by our community"
        image="/resources/logo/logo.svg"
        title="Works on Workers"
        link={{ text: "Submit package", url: "https://airtable.com/shrtvoM4QfEr48ZoQ" }}
      >
        <>
          <div>
            <iframe
              className="airtable-embed"
              src="https://airtable.com/embed/shrTR0QCusxZoCgiJ?backgroundColor=yellow&viewControls=on"
              frameborder="0"
              onmousewheel=""
              width="100%"
              height="800"
              style={{ background: 'transparent', border: '1px solid #ccc' }}
            />
          </div>

          <div className={tw`md:max-w-4xl mx-auto mt-12 pt-8 pb-32`}>
            <h2 className={tw`text-4xl pt-4 pb-12`}>Frequently Asked Questions</h2>

            <h3 className={tw`text-xl font-semibold`}>Does Workers supports React/Angular/Svelte/your frontend framework of choice?</h3>

            <p className={tw`text-lg py-4`}>
              Workers supports some server-rendered solutions for frameworks like React and Svelte. We
              generally suggest these solutions for power-users, and recommend that developers deploying front-end applications check out our
              deployment platform Cloudflare Pages.
            </p>

            <h3 className={tw`text-xl font-semibold pt-4`}>A package that you suggested doesn't work!</h3>

            <p className={tw`text-lg py-4`}>
              Some packages may require special configuration (see the "Notes" section for each package). If a package is listed on our list that isn't supported, you can reach out to us on the <a className="Link" href="https://discord.gg/cloudflaredev">Cloudflare Workers Discord server</a> and we'll get it removed as soon as possible.
            </p>

            <h3 className={tw`text-xl font-semibold pt-4`}>What packages don't work?</h3>

            <p className={tw`text-lg py-4`}>
              Many packages that require <em>Node dependencies</em>, such as <code>fs</code> or <code>net/http</code>, aren't supported in Workers because Workers isn't Node—it's <a className="Link" href="https://developers.cloudflare.com/workers/learning/how-workers-works">built on V8</a>.
            </p>

            <p className={tw`text-lg`}>
              If you're using browser packages in Workers, you should be aware that many of them refer to <code>window</code>—the instance of the browser window. This isn't supported in Workers (because it runs in V8, not on a browser window).
            </p>
          </div>
        </>

      </ContentPage>
    </Layout>
  )
}

export default WorksPage