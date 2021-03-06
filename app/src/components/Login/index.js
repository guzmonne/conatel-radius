import React from 'react'
import LoginComponent from './Component.js'
import Container from '../common/Container.js'
import Cookie from 'js.cookie'

const LoginContainerHoF = Component => class LoginContainer extends Container {
  onLogin = (credentials) => {
    this.isLoading()
    this.post('/auth/login', credentials)
    .then(user => {
      this.isNotLoading()
      Cookie.set('user', user)
      this.props.router.replace('/')
    })
    .catch(({error}) => this.withError(error))
  }

  render() {
    const {onLogin, state: {error, loading}} = this
    return <Component {...{onLogin, error, loading}} />
  }
}

export default LoginContainerHoF(LoginComponent)
