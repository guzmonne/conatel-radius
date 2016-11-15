import React from 'react'
import LoginComponent from './Component.js'
import Container from '../common/Container.js'

const LoginContainerHoF = Component => class LoginContainer extends Container {
  onLogin = (credentials) => {
    this.isLoading()
    this.post(credentials)
    .then(res => {
      this.isNotLoading()
      console.log(res)
    })
    .catch(({error}) => this.withError(error))
  }

  render() {
    const {onLogin, state: {error, loading}} = this
    return <Component {...{onLogin, error, loading}} />
  }
}

export default LoginContainerHoF(LoginComponent)
export {LoginContainerHoF as Container}
