import React, { useEffect, useState } from "react"
import { useSSR } from "../utils"

import "./clap.css"

const clap = async setClapped => {
  const url = new URL(window.location)
  await fetch(url.pathname + "/clap", {
    method: "POST",
  })

  setClapped(true)

  return false
}

const hydrate = async setClapped => {
  return new Promise(async resolve => {
    const url = new URL(window.location)
    const resp = await fetch(url.pathname + "/_hydrate")
    const data = document.querySelector("script#claps_json")
    const json = await resp.json()
    data.innerText = JSON.stringify(json)
    resolve()
  })
}

const unclap = async setClapped => {
  const url = new URL(window.location)
  await fetch(url.pathname + "/unclap", {
    method: "POST",
  })

  setClapped(false)

  return false
}

const ClapButton = ({ onClick }) => (
  <button class="Button" onClick={onClick}>
    <span class="Clap--icon"></span>
  </button>
)

const Clap = ({ clapped, project, setClapped, setLoaded }) => {
  useEffect(() => {
    async function parse() {
      const data = document.querySelector("script#claps_json")
      if (!data.innerText.length) {
        await hydrate(setClapped)
      }

      const parsed = JSON.parse(data.innerText)
      const kvClapped = parsed[`${project.slug}_clapped`]
      if (kvClapped) {
        setClapped(kvClapped)
      }
    }

    parse()
    setLoaded(true)
  }, [])

  return (
    <ClapButton
      onClick={() => (!clapped ? clap(setClapped) : unclap(setClapped))}
    />
  )
}

export default props => {
  const [loaded, setLoaded] = useState(false)
  const [clapped, setClapped] = useState(false)
  const { isBrowser } = useSSR()

  return (
    <div
      class={
        "Clap" +
        (clapped ? " Clap-is-clapped" : "") +
        (loaded ? "" : " Clap-is-loading")
      }
    >
      {isBrowser ? (
        <Clap
          {...props}
          clapped={clapped}
          setClapped={setClapped}
          loaded={loaded}
          setLoaded={setLoaded}
        />
      ) : (
        <ClapButton />
      )}
    </div>
  )
}
