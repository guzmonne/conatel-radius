import React, {PropTypes as T} from 'react'
import {connect} from 'react-redux'
import {usersIndex, usersCreate, usersUpdateUi} from '../actions/'
import DashboardComponent from '../components/Dashboard.js'
import {IRadcheckItems} from '../components/interfaces.js'

class DashboardContainer extends React.Component {
  static propTypes = {
    onFetch: T.func.isRequired,
    onUpdateUi: T.func.isRequired,
    items: IRadcheckItems.isRequired,
    loading: T.bool,
    creating: T.bool,
    limit: T.number,
    offset: T.number,
    ui: T.shape({
      isOpenCreateModal: T.bool,
    })
  }

  componentWillMount() {
    const {limit, offset, onFetch} = this.props
    onFetch({limit, offset})
  }

  componentWillReceiveProps(newProps) {
    // If the 'creating' flag transitions from true to false and
    // there is no error defined, then the user creation was 
    // successful and we can close the modal.
    const {creating:prevCreating} = this.props
    const {creating:nextCreating, error} = newProps
    if (prevCreating === true && nextCreating === false && !error)
      this.props.onUpdateUi({isOpenCreateModal: false})
  }

  onOpen = () => {
    this.props.onUpdateUi({isOpenCreateModal: true})
  }

  onCreate = (user) => {
    this.props.onCreate(user)
  }

  onClose = () => {
    this.props.onUpdateUi({isOpenCreateModal: false})
  }

  render() {
    const {items, loading, creating, onFetch, limit, offset, ui} = this.props
    const {onOpen, onClose, onCreate} = this
    if (items.length === 0 && loading)
      return <h1><i>Loading items...</i></h1>
    return <DashboardComponent 
      {...{
        items,
        loading,
        creating,
        onOpen,
        onClose,
        onCreate,
        onLoad: onFetch, limit, offset,
        open: ui.isOpenCreateModal
      }}
    />
  }
}

const mapStateToProps = (state /*, ownProps*/) => {
  const {
    flags: {usersIndex:loading, usersCreate:creating},
    entities: {users},
    users: {ids, limit, offset, ui},
    error,
  } = state
  return {
    error,
    loading,
    creating,
    items: ids.map(id => users[id]),
    limit,
    offset,
    ui,
  }
}

const ConnectedDashboardContainer = connect(mapStateToProps, {
  onFetch: usersIndex,
  onUpdateUi: usersUpdateUi,
  onCreate: usersCreate,
})(DashboardContainer)

export default ConnectedDashboardContainer
