import React, { useState, useEffect } from "react"

const states = {
  INIT: "init",
  TESTING: "testing",
  TESTED: "tested",
  ERROR: "error",
}

const getLatencyToCloudflare = async () => {
  const TEST_URL = "https://1.1.1.1/cdn-cgi/trace"
  const NUM_TESTS = 5

  let started = 0
  async function load() {
    started++

    await fetch(TEST_URL, {
      mode: "no-cors",
      cache: "no-store",
    })

    if (started < NUM_TESTS) await load()
  }

  await load()
  let entries = performance.getEntriesByName(TEST_URL, "resource")
  let min = Infinity

  for (
    let i = Math.max(0, entries.length - NUM_TESTS);
    i < entries.length;
    i++
  ) {
    // iOS Safari doesn’t report duration
    const duration =
      entries[i].duration || entries[i].responseEnd - entries[i].fetchStart

    if (duration < min) min = duration
  }

  return min | 0
}

export default () => {
  const [state, setState] = useState(states.INIT)
  const [latency, setLatency] = useState(null)

  const testLatency = async () => {
    try {
      setState(states.TESTING)
      const newLatency = await getLatencyToCloudflare()
      if (isNaN(newLatency) || newLatency === 0 || newLatency > 50)
        setLatency(null)

      setLatency(newLatency)
      setState(states.TESTED)
    } catch (err) {
      setState(states.ERROR)
    }
  }

  useEffect(() => {
    testLatency()
  }, [])

  return [states.INIT, states.ERROR].includes(state) ? null : (
    <p className="BenefitsSection--benefit-description-latency-test">
      Your actual latency:{" "}
      {latency && (
        <span className="BenefitsSection--benefit-description-latency-test-value">
          {latency} ms
        </span>
      )}{" "}
      <span className="BenefitsSection--benefit-description-latency-test-button">
        <button
          className="Button Button-is-secondary-orange"
          disabled={state !== states.TESTED}
          onClick={testLatency}
        >
          Test again
        </button>
      </span>
    </p>
  )
}
