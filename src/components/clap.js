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
    const data = document.querySelector("script#claps_json")
    if (!data.innerText.length) {
      setESR(false)
      return
    }

    setESR(true)

    const parsed = JSON.parse(data.innerText)
    if (parsed[`${project.slug}_clapped`]) {
      setClapped(parsed[`${project.slug}_clapped`])
    }
  }, [project.slug])

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
