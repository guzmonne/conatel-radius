import React, {PropTypes as T} from 'react'
import {
  RadpostauthTable,
  IRadpostauthItems,
  RadcheckTable,
  IRadcheckItems,
} from '../common/tables/'

class DashboardComponent extends React.Component {
  static propTypes = {
    onLoadRadpostauth: T.func,
    onLoadRadcheck: T.func,
    onOrderBy: T.func,
    loading: T.bool,
    radpostauthItems: IRadpostauthItems,
    radcheckItems: IRadcheckItems,
  }

  static defaultProps = {
    limit: 10,
    offset: 0,
    orderBy: 'id',
  }

  onLoad = (e) => {
    e.preventDefault()
    this.props.onLoad()
  }

  onMore = (e) => {
    e.preventDefault()
    if (this.props.loading) return
    const {offset, limit} = this.props
    this.props.onLoad(offset + limit)
  }

  render() {
    const {radcheckItems, radpostauthItems, limit, loading} = this.props
    const {onMore} = this
    return (
      <div className="Dashboard">
        <RadpostauthTable {...{items: radpostauthItems, limit, loading, onMore}} />
        <RadcheckTable {...{items: radcheckItems, limit, loading, onMore}} />
      </div>
    )
  }
}

export default DashboardComponent
