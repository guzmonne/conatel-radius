import React from 'react'
import Container from '../common/Container.js'
import MainComponent from './Component.js'
import Cookies from 'js.cookie'

const MainContainerHoF = Component => class MainContainer extends Container {
  onLogout = () => {
    this.get('/auth/logout')
    .then(result => {
      console.log(result)
      Cookies.remove('user')
      this.props.router.replace('/login')
    })
    .catch(error => {
      console.error(error)
    })
  }
  
  render() {
    const {onLogout} = this
    const {children, router: {replace}} = this.props
    return <Component {...{onLogout, children, replace}} />
  }
}

export default MainContainerHoF(MainComponent)
