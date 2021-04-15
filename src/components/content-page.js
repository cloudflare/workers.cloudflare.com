// Experimental content page component for
// consistent rendering across some of our newer
// content

import React, { useEffect, useRef } from 'react'
import { setup, tw } from 'twind'
import Layout from "../components/layout"
import SEO from "../components/seo"

// Setup dark mode class config
setup({ darkMode: 'class' })

const ContentPage = ({ image, link, title, description, cta, children }) => {
  const content = useRef(null)

  useEffect(() => {
    const htmlSelector = document.querySelector("html")
    const theme = htmlSelector.getAttribute("theme")
    theme === "dark" && htmlSelector.classList.add("dark")

    content.current.hidden = false
  }, [])

  return (
    <div className={tw`antialiased text-black dark:text-white mx-4`} hidden ref={content}>
      <div className={tw`md:max-w-4xl mx-auto pt-16`}>
        <div className={tw`mt-16 mb-8 flex items-start align-middle`}>
          {image ? <img className={tw`w-24 mr-8 mt-2`} alt="Workers logo" src={image} /> : null}
          <div className={tw`flex-1`}>
            <h1 className={tw`text-4xl mb-4 font-bold`}>{title}</h1>
            <h2 className={tw`text-lg max-w-xl`}>{description}</h2>
          </div>
          {link ?
            <a className={
              [`Button Button-is-primary`, tw`text-xl mt-2`].join(' ')
            }
              href={link.url}>{link.text}</a>
            : null}
        </div>
      </div>

      <div className={tw`md:max-w-4xl mx-auto pt-8`}>
        {children}
      </div>
    </div >
  )
}

export default ContentPage