import React from 'react'

const MainComponent = ({children}) => 
  <div className="Main">
    {children}
  </div>

const MainContainerHoF = Component => class MainContainer extends React.Component {
  render() {
    const {children} = this.props
    return <Component children={children} />
  }
}

export default MainContainerHoF(MainComponent)
