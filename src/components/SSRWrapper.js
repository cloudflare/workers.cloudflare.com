import React from "react"

class SSRWrapper extends React.Component {
  constructor() {
    super()
    this.state = {
      display: false,
    }
  }

  componentDidMount() {
    this.setState({ display: true })
  }

  render() {
    const { component: Component, ...props } = this.props
    return this.state.display ? <Component {...props} /> : null
  }
}

const createWrappedComponent = (component, props) => (
  <SSRWrapper component={component} {...props} />
)
export default createWrappedComponent
