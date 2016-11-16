import React from 'react'
import Container from '../common/Container.js'
import DashboardComponent from './Component.js'

const DashboardContainerHoF = Component => class DashboardContainer extends Container {
  
  constructor(props) {
    super(props, {
      radpostauthItems: [],
      radcheckItems: [],
      limit: 10,
      offset: 0,
      orderBy: 'id',
    })
  }

  componentDidMount() {
    this.isLoading()
    this.onLoad()
  }

  onLoad = () => {
    this.onLoadRadpostauth()
    this.onLoadRadcheck()
  }
  
  onLoadRadpostauth = (newOffset) => {
    const {offset, limit, orderBy} = this.state
    const _offset = newOffset ? newOffset : offset
    this.isLoading()
    return this.get(`/api/radpostauth?offset=${_offset}&limit=${limit}&orderBy=${orderBy}`)
    .then(items => {
      this.setState({
        radpostauthItems: [...this.state.radpostauthItems, ...items],
        loading: false,
        offset: _offset
      })
    })
    .catch(error => {
      this.withError(error)
    })
  }

  onLoadRadcheck = (newOffset) => {
    const {offset, limit, orderBy} = this.state
    const _offset = newOffset ? newOffset : offset
    this.isLoading()
    return this.get(`/api/radcheck?offset=${_offset}&limit=${limit}&orderBy=${orderBy}`)
    .then(items => {
      this.setState({
        radcheckItems: [...this.state.radcheckItems, ...items],
        loading: false,
        offset: _offset
      })
    })
    .catch(error => {
      this.withError(error)
    })
  }
  
  render() {
    return <Component {...this.state} />
  }
}

export default DashboardContainerHoF(DashboardComponent)
