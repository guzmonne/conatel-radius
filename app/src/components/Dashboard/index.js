import React from 'react'

const DashboardComponent = () => 
  <div className="Dashboard">
    <h1>I am the Dashboard</h1>
  </div>

const DashboardContainerHoF = Component => class DashboardContainer extends React.Component {
  render() {
    return <Component />
  }
}

export default DashboardContainerHoF(DashboardComponent)
