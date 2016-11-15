import React from 'react'

const SignupComponent = () => 
  <div className="Signup">
    <h1>I am the Signup</h1>
  </div>

const SignupContainerHoF = Component => class SignupContainer extends React.Component {
  render() {
    return <Component />
  }
}

export default SignupContainerHoF(SignupComponent)
