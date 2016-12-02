import React, {PropTypes as T} from 'react'
import {connect} from 'react-redux'
import {nasIndex, nasCreate, nasUpdateUi} from '../actions/'
import {INasItems} from '../components/interfaces.js'
import NasComponent from '../components/Nas.js'
import pick from 'lodash/pick'

class NasContainer extends React.Component {
  static propTypes = {
    onFetch: T.func.isRequired,
    onUpdateUi: T.func.isRequired,
    items: INasItems.isRequired,
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

  onClose = () => {
    this.props.onUpdateUi({isOpenCreateModal: false})
  }

  render() {
    const fromProps = pick(this.props, 'items', 'loading', 'creating', 'onFetch', 'onCreate', 'limit', 'offset', 'ui', 'error')
    const fromThis = pick(this, 'onOpen', 'onClose')
    if (fromProps.items.length === 0 && fromProps.loading)
      return <h1><i>Loading items...</i></h1>
    return <NasComponent {...fromThis} {...fromProps}/>
  }
}

const mapStateToProps = (state /*, ownProps*/) => {
  const {
    flags: {nasIndex:loading, nasCreate:creating},
    entities: {nas},
    nas: {ids, limit, offset, ui},
    error,
  } = state
  return {
    error,
    loading,
    creating,
    items: ids.map(id => nas[id]),
    limit,
    offset,
    ui,
  }
}

const ConnectedNasContainer = connect(mapStateToProps, {
  onFetch: nasIndex,
  onUpdateUi: nasUpdateUi,
  onCreate: nasCreate,
})(NasContainer)

export default ConnectedNasContainer
