import React, {PropTypes as T} from 'react'
import {connect} from 'react-redux'
import {usersIndex, usersCreate, usersUpdateUi} from '../actions/'
import AdminsComponent from '../components/Admins.js'
import {IRadcheckItems} from '../components/interfaces.js'
import pick from 'lodash/pick'

class AdminsContainer extends React.Component {
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

  componentDidMount() {
    this.props.onFetch()
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
    const fromProps = pick(this.props, 'items', 'loading', 'creating', 'onFetch', 'limit', 'offset', 'ui', 'error')
    const fromThis = pick(this, 'onOpen', 'onClose', 'onCreate')
    if (fromProps.items.length === 0 && fromProps.loading)
      return <h1><i>Loading items...</i></h1>
    return <AdminsComponent {...fromProps} {...fromThis}/>
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

const ConnectedAdminsContainer = connect(mapStateToProps, {
  onFetch: usersIndex,
  onUpdateUi: usersUpdateUi,
  onCreate: usersCreate,
})(AdminsContainer)

export default ConnectedAdminsContainer
