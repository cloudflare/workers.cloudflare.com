class EmbedClaps {
  constructor(project, projectClaps) {
    this._project = project
    this._projectClaps = projectClaps
  }

  element(element) {
    const script = {
      [this._project]: this._projectClaps,
    }
    console.log(element)
    element.setInnerContent(JSON.stringify(script))
  }
}

const _transform = async (request, response) => {
  const url = new URL(request.url)
  const matches = url.pathname.match(/\/projects\/(\w*)/)
  const project = matches[1]
  const data = await BUILT_WITH_WORKERS.get(`projects:${project}`)
  let projectClaps = 0
  if (data) {
    projectClaps = Number(data)
  }

  const rewriter = new HTMLRewriter().on(
    "script#claps",
    new EmbedClaps(project, projectClaps)
  )

  return rewriter.transform(response)
}

const transformClap = (request, response) => {
  const url = new URL(request.url)
  if (url.pathname.includes("/projects")) {
    return _transform(request, response)
  } else {
    return response
  }
}

const clap = async request => {
  try {
    const url = new URL(request.url)
    const matches = url.pathname.match(/\/projects\/(\w*)/)
    const project = matches[1]
    const data = await BUILT_WITH_WORKERS.get(`projects:${project}`)
    let projectClaps = 0
    if (data) {
      projectClaps = Number(data)
    }

    projectClaps += 1
    await BUILT_WITH_WORKERS.put(`projects:${project}`, projectClaps)
    return new Response("ok")
  } catch (err) {
    console.error(err)
  }
}

export { clap, transformClap }
