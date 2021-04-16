import React from 'react'
import { tw } from 'twind'
import Layout from "../components/layout"
import SEO from "../components/seo"

import ContentPage from '../components/content-page'

const NodePage = () => {
  return (
    <Layout>
      <SEO title="Building Node.js Support" />

      <ContentPage
        description="Vote on which Node.js-dependent libraries & APIs that Cloudflare Workers should support"
        image="/resources/logo/logo.svg"
        title="Building Node.js Support"
        link={{ text: "Vote", url: "https://airtable.com/shrM9MdUR8ojbUdSZ" }}
      >
        <>
          <div>
            <iframe
              className="airtable-embed"
              src="https://airtable.com/embed/shrSMXSIQ5TI70XwV?backgroundColor=yellow&viewControls=on"
              frameborder="0"
              onmousewheel=""
              width="100%"
              height="600"
              style={{ background: 'transparent', border: '1px solid #ccc' }}
            />
          </div>

          <div className={tw`md:max-w-4xl mx-auto mt-12 pt-8 pb-32`}>
            <h2 className={tw`text-4xl pt-4 pb-12`}>Frequently Asked Questions</h2>

            <h3 className={tw`text-xl font-semibold`}>What support does Cloudflare Workers currently offer for Node.js?</h3>

            <p className={tw`text-lg py-4`}>
              The Workers runtime supports any Node.js package that uses either webpack or another polyfill bundler. With webpack, you can bundle up your Node.js dependencies and deploy to Workers using our CLI tool, <a className={tw`Link`} href="https://developers.cloudflare.com/workers/cli-wrangler/webpack">wrangler</a>. Also, with <a className={tw`Link`} href="https://developers.cloudflare.com/workers/runtime-apis/durable-objects">Durable Objects</a>, you can use our new modules API that allows you to upload Workers as <a className={tw`Link`} href="https://github.com/cloudflare/wrangler/pull/1807">ES Modules</a>.
          </p>

            <h3 className={tw`text-xl font-semibold pt-4`}>How can I keep track on the latest news about Node.js support and other Workers products? </h3>

            <p className={tw`text-lg py-4`}>
              Please come visit us in the <a className={tw`Link`} href="https://discord.gg/cloudflaredev">Workers Discord</a>, where the team regularly shares updates on the roadmap!
          </p>
          </div>
        </>
      </ContentPage>
    </Layout >
  )
}

export default NodePage
