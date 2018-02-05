import PropTypes from 'prop-types'
/*
  This is a generic component that uses a
  child render function.
  Any prop it receives will be passed to the fn
  Check out the test to see how it works

  Usage is to use this as the component to any Redux connect()
  hoc, and then in your component use the connect props as you wish!
*/
export default function Connector({ children, ...props }) {
  return children(props)
}

Connector.PropTypes = {
  children: PropTypes.func.isRequired
}

Connector.defaultProps = {
  children: () => null
}
