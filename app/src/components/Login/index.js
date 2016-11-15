import React from 'react'
import Component from './Component.js'

class Login extends React.Component {
  onLogin = ({username, password}) => {
    console.log(username, password)
  }

  render() {
    const {onLogin} = this
    return <Component {...{onLogin}} />
  }
}

export default Login