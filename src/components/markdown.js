import React from "react"
import ReactMarkdown from "react-markdown"

import "@cloudflare/workers-brand-assets/css/components/link.css"
import "@cloudflare/workers-brand-assets/css/components/inline-code.css"
import "@cloudflare/workers-brand-assets/css/components/code-block.css"
// import "@cloudflare/workers-brand-assets/css/components/unordered-list.css"
import "./unordered-list.css" // TODO - remove once https://git.io/JvmSL is resolved

import "./markdown.css"

const Link = (props) => <a href={props.href} className="Link">{props.children}</a>

const List = (props) => {
  return props.ordered ? 
    <ol className="OrderedList">{props.children}</ol> :
    <ul className="UnorderedList">{props.children}</ul>
}

const InlineCode = (props) => <code className="InlineCode">{props.children}</code>

const CodeBlock = (props) => <pre className="CodeBlock CodeBlock-scrolls-horizontally"><code>{props.value}</code></pre>

// TODO - look through for more renderers
// https://www.npmjs.com/package/react-markdown

const Markdown = (props) => (
  <ReactMarkdown {...props}
    className="Markdown"
    renderers={{
      link: Link,
      list: List,
      inlineCode: InlineCode,
      code: CodeBlock,
    }}
  />
)

export default Markdown
