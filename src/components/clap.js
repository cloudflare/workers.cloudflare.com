import React, { useEffect, useState } from "react"
import SSRWrapper from "./SSRWrapper"

import "./clap.css"

const clap = async (claps, setClaps, setClapped) => {
  const url = new URL(window.location)
  await fetch(url.pathname + "/clap", {
    method: "POST",
  })

  setClaps(claps + 1)
  setClapped(true)

  return false
}

const unclap = async (claps, setClaps, setClapped) => {
  const url = new URL(window.location)
  await fetch(url.pathname + "/unclap", {
    method: "POST",
  })

  setClaps(claps - 1)
  setClapped(false)

  return false
}

const Clap = ({ project }) => {
  const [esr, setESR] = useState(false)
  const [clapped, setClapped] = useState(false)
  const [claps, setClaps] = useState(0)

  useEffect(() => {
    const data = document.querySelector("script#claps")
    if (!data.innerText.length) {
      setESR(false)
      return
    }

    setESR(true)

    const parsed = JSON.parse(data.innerText)
    if (parsed[project.slug]) {
      setClaps(Number(parsed[project.slug]))
    }
  }, [project.slug])

  if (!esr) {
    return null
  }

  return (
    <div class={"Clap" + (clapped ? " Clap-is-clapped" : "")}>
      <button
        class="Button"
        onClick={() => !clapped ?
          clap(claps, setClaps, setClapped) :
          unclap(claps, setClaps, setClapped)
        }
      >
        <span class="Clap--clap-button-content"></span>
      </button>
      <span class="Clap--count">{claps}</span>
    </div>
  )
}

const WrappedClap = props => SSRWrapper(Clap, props)
export default WrappedClap
