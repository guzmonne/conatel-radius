import React, {PropTypes as T} from 'react'
import {connect} from 'react-redux'
import {radcheckIndex} from '../actions/'
import DashboardComponent from '../components/Dashboard.js'
import {IRadcheckItems} from '../components/interfaces.js'

class DashboardContainer extends React.Component {
  static propTypes = {
    radcheckIndex: T.func.isRequired,
    items: IRadcheckItems.isRequired,
    loading: T.bool,
    limit: T.number,
    offset: T.number,
  }

  componentWillMount() {
    const {limit, offset, radcheckIndex} = this.props
    radcheckIndex({limit, offset})
  }

  render() {
    const {items, loading, radcheckIndex, limit, offset} = this.props
    if (items.length === 0 && loading)
      return <h1><i>Loading items...</i></h1>
    return <DashboardComponent 
      {...{items, loading, onLoad: radcheckIndex, limit, offset}}
    />
  }
}

const mapStateToProps = (state /*, ownProps*/) => {
  const {
    flags: {radcheckIndex:loading},
    entities: {radcheck},
    radcheck: {ids, limit, offset},
  } = state
  return {
    loading,
    items: ids.map(id => radcheck[id]),
    limit,
    offset,
  }
}

const ConnectedDashboardContainer = connect(mapStateToProps, {
  radcheckIndex,
})(DashboardContainer)

export default ConnectedDashboardContainer
