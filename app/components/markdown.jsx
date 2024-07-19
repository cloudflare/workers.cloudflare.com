import React from "react"
import ReactMarkdown from "react-markdown"

import "@cloudflare/cloudflare-brand-assets/css/components/link.css"
import "@cloudflare/cloudflare-brand-assets/css/components/inline-code.css"
import "@cloudflare/cloudflare-brand-assets/css/components/code-block.css"
import "@cloudflare/cloudflare-brand-assets/css/components/unordered-list-workers-themed.css"

import "../styles/markdown.css"

const Link = (props) => (
  <a href={props.href} className="Link">
    {props.children}
  </a>
)

const List = (props) => {
  return props.ordered ? (
    <ol>{props.children}</ol>
  ) : (
    <ul className="UnorderedListWorkersThemed">{props.children}</ul>
  )
}

const InlineCode = (props) => (
  <code className="InlineCode">{props.children}</code>
)

const CodeBlock = (props) => (
  <pre className="CodeBlock CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme">
    <code className="CodeBlock--code">{props.value}</code>
  </pre>
)

// TODO - look through for more renderers
// https://www.npmjs.com/package/react-markdown

const Markdown = (props) => (
  <ReactMarkdown
    {...props}
    className="Markdown"
    components={{
      link: Link,
      list: List,
      inlineCode: InlineCode,
      code: CodeBlock,
    }}
  />
)

export default Markdown
