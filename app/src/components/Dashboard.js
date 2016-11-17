import React, {PropTypes as T} from 'react'
import {RadcheckTable} from './common/tables/'
import {IRadcheckItems} from './interfaces.js'

const Dashboard = ({onLoad, loading, items, limit, offset}) => {
  const onMore = (e) => {
    e.preventDefault()
    if (loading) return
    onLoad()
  }
  
  return (
    <div className="Dashboard">
      <RadcheckTable {...{items, loading, onMore}} />
    </div>
  )
}

Dashboard.propTypes = {
  onLoad: T.func.isRequired,
  loading: T.bool,
  items: IRadcheckItems,
  limit: T.number.isRequired,
  offset: T.number.isRequired,
}

export default Dashboard
