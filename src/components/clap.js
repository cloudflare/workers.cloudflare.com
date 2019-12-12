import React, { useEffect, useState } from "react"
import { useSSR } from "../utils"

import "./clap.css"
import { EdgeStateContext } from "./edge_state"

const clap = async ({ key, setClapped, setState }) => {
  const url = new URL(window.location)
  await fetch(url.pathname + "/clap", {
    method: "POST",
  })

  setClapped(true)
  setState({ [key]: true })

  return false
}

const unclap = async ({ key, setClapped, setState }) => {
  const url = new URL(window.location)
  await fetch(url.pathname + "/unclap", {
    method: "POST",
  })

  setClapped(false)
  setState({ [key]: false })

  return false
}

const hydrate = async (state, setState) => {
  return new Promise(async resolve => {
    const url = new URL(window.location)
    const resp = await fetch(url.pathname + "/_hydrate")
    const { claps } = await resp.json()
    setState(claps)
    resolve()
  })
}

const ClapButton = ({ onClick }) => (
  <button class="Button" onClick={onClick}>
    <span class="Clap--icon"></span>
  </button>
)

const Clap = ({ clapped, project, setClapped, setLoaded }) => {
  const key = `${project.slug}_clapped`
  const [state, setState] = React.useContext(EdgeStateContext)

  useEffect(() => {
    async function parse() {
      if (!state || !Object.keys(state).includes(key)) {
        return hydrate(state, setState)
      }

      const kvClapped = state[key]
      if (kvClapped) {
        setClapped(kvClapped)
      }
    }

    parse()
    setLoaded(true)
  }, [state])

  return (
    <ClapButton
      onClick={() =>
        !clapped
          ? clap({ key, setClapped, setState })
          : unclap({ key, setClapped, setState })
      }
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
