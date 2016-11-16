import React from 'react'

const defaultFetchOptions = {
  credentials: 'same-origin',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
}

class Container extends React.Component {
  constructor(props, state) {
    super(props)
    this.state = Object.assign({}, {
      loading: false,
      error: null
    }, state)
  }
  // Run an HTTP get request to the Server
  get = (url) => 
    fetch(url, Object.assign({}, defaultFetchOptions))
    .then(res => res.json())
    .then(res => res.error ? Promise.reject(res) : res)
  // Run an HTTP post request to the Server
  post = (url, body) =>
    fetch(url, Object.assign({}, defaultFetchOptions, {
      method: 'POST',
      body: JSON.stringify(body),
    }))
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
