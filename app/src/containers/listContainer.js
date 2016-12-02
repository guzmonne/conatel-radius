import React, {PropTypes as T} from 'react'
import {connect} from 'react-redux'
import pick from 'lodash/pick'
import isFunction from 'lodash/isFunction'

/**
 * List container HoF to simplify the creation of simple list containers.
 * @param {Object} itemsInterface  React propTypes corresponding to the list items.
 * @param {ui} custom
 */
const listContainer = ({itemsInterface, name, onFetch, onCreate, onUpdateUi, Component}) => {
  class ListContainer extends React.Component {
    static propTypes = {
      onFetch: T.func.isRequired,
      onUpdateUi: T.func.isRequired,
      items: itemsInterface.isRequired,
      loading: T.bool,
      creating: T.bool,
      limit: T.number,
      offset: T.number,
      ui: T.shape({
        isOpenCreateModal: T.bool,
      }),
    }

    componentDidMount() {
      if (isFunction(this.props.onFetch))
        this.props.onFetch()
    }

    componentWillReceiveProps(newProps) {
      // Check to see if onUpdateUi prop is a function
      if (!isFunction(this.props.onUpdateUi)) return
      // If the 'creating' flag transitions from true to false and
      // there is no error defined, then the user creation was 
      // successful and we can close the modal.
      const {creating:prevCreating} = this.props
      const {creating:nextCreating, error} = newProps
      if (prevCreating === true && nextCreating === false && !error)
        this.props.onUpdateUi({isOpenCreateModal: false})
    }

    onOpen = () => {
      if (!isFunction(this.props.onUpdateUi)) return      
      this.props.onUpdateUi({isOpenCreateModal: true})
    }

    onClose = () => {
      if (!isFunction(this.props.onUpdateUi)) return      
      this.props.onUpdateUi({isOpenCreateModal: false})
    }

    render() {
      const fromProps = pick(this.props, 'items', 'loading', 'creating', 'onFetch', 'onCreate', 'limit', 'offset', 'ui', 'error')
      const fromThis = pick(this, 'onOpen', 'onClose')
      if (fromProps.items.length === 0 && fromProps.loading)
        return <h1><i>Loading items...</i></h1>
      return <Component {...fromThis} {...fromProps}/>
    }
  }

  const mapStateToProps = (state) => {
    const {error} = state
    const loading = state.flags[name + 'Index']
    const creating = state.flags[name + 'Create']
    const entities = state.entities[name]
    const {ids, limit, offset, ui} = state[name]
    return {
      error,
      loading,
      creating,
      items: ids.map(id => entities[id]),
      limit,
      offset,
      ui,
    }
  }

  const ConnectedListContainer = connect(mapStateToProps, {
    onFetch,
    onUpdateUi,
    onCreate,
  })(ListContainer)

  return ConnectedListContainer
}

export default listContainer
