import React, { useEffect, useRef } from 'react'
import { setup, tw } from 'twind'
import Layout from "../components/layout"
import SEO from "../components/seo"

// Setup dark mode class config
setup({ darkMode: 'class' })

const WorksPage = () => {
  const content = useRef(null)

  useEffect(() => {
    const htmlSelector = document.querySelector("html")
    const theme = htmlSelector.getAttribute("theme")
    theme === "dark" && htmlSelector.classList.add("dark")

    content.current.hidden = false
  }, [])

  return (
    <Layout>
      <SEO title="Works on Workers" />

      <div className={tw`antialiased text-black dark:text-white mx-4`} hidden ref={content}>
        <div className={tw`md:max-w-4xl mx-auto pt-16 pb-8`}>
          <div className={tw`text-center mt-16 mb-12`}>
            <h1 className={tw`text-4xl mb-4 font-bold`}>Works on Workers</h1>
            <h2 className={tw`text-xl`}>
              The best packages and libraries supported by Cloudflare Workers, chosen by <a className={tw`Link`} href="https://discord.gg/cloudflaredev">our community</a>
            </h2>
          </div>

          <div className={tw`text-center`}>
            <iframe
              className="airtable-embed"
              src="https://airtable.com/embed/shrTR0QCusxZoCgiJ?backgroundColor=yellow&viewControls=on"
              frameborder="0"
              onmousewheel=""
              width="100%"
              height="800"
              style={{ background: 'transparent', border: '1px solid #ccc' }}
            />
            <p className={tw`my-4`}>
              <a className={tw`Link`} href="https://airtable.com/shrtvoM4QfEr48ZoQ">Submit new packages</a>
            </p>
          </div>
        </div>

        <div className={tw`md:max-w-3xl mx-auto mt-12 pt-8 pb-32`}>
          <h2 className={tw`text-center text-4xl pt-4 pb-12`}>FAQ</h2>

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
      </div>
    </Layout >
  )
}

export default WorksPage