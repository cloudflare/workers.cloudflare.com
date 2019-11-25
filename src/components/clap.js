import React, { useEffect, useState } from "react"
import SSRWrapper from "./SSRWrapper"

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

const Clap = ({ project }) => {
  const [esr, setESR] = useState(false)
  const [clapped, setClapped] = useState(false)

  useEffect(() => {
    async function parse() {
      const data = document.querySelector("script#claps_json")
      if (!data.innerText.length) {
        await hydrate(setClapped)
      }

      setESR(true)

      const parsed = JSON.parse(data.innerText)
      const kvClapped = parsed[`${project.slug}_clapped`]
      if (kvClapped) {
        setClapped(kvClapped)
      }
    }

    parse()
  }, [])

  if (!esr) {
    return null
  }

  return (
    <div class={"Clap" + (clapped ? " Clap-is-clapped" : "")}>
      <button
        class="Button"
        onClick={() => (!clapped ? clap(setClapped) : unclap(setClapped))}
      >
        <span class="Clap--icon"></span>
      </button>
    </div>
  )
}

const WrappedClap = props => SSRWrapper(Clap, props)
export default WrappedClap
