class EdgeStateEmbed {
  constructor(state) {
    this._state = state
  }

  element(element) {
    const edgeStateElement = `
      <script id='edge_state' type='application/json'>
        ${JSON.stringify(this._state)}
      </script>
    `
    element.prepend(edgeStateElement, { html: true })
  }
}

export const hydrateEdgeState = async ({ state, response }) => {
  const rewriter = new HTMLRewriter().on(
    "body",
    new EdgeStateEmbed(await state)
  )
  return rewriter.transform(await response)
}
