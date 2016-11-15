import React from 'react'

class Container extends React.Component {
  constructor(props, state) {
    super(props)
    this.state = Object.assign({}, {
      loading: false,
      error: null
    }, state)
  }
  // Run an HTTP post request to the DB
  post = (body) =>
    fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(res => res.error ? Promise.reject(res) : res)
  // Set the state loading flag to true.
  isLoading = () => this.setState({loading: true, error: null})
  // Set the state loading flag to false.
  isNotLoading = () => this.setState({loading: false})
  // Set the state error value,
  withError = (error) => this.setState({error, loading: false})
}

export default Container
