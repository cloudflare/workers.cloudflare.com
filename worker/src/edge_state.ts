class EdgeStateEmbed {
  constructor(private state: unknown) {}

  element(element: Element) {
    const edgeStateElement = `
      <script id='edge_state' type='application/json'>
        ${JSON.stringify(this.state)}
      </script>
    `
    element.prepend(edgeStateElement, { html: true })
  }
}

export const hydrateEdgeState = ({
  state,
  response,
}: {
  state: unknown
  response: Response
}) => {
  const rewriter = new HTMLRewriter().on("body", new EdgeStateEmbed(state))
  return rewriter.transform(response)
}
