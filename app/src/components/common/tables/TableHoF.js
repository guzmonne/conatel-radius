import React, {PropTypes as T} from 'react'
import {Table, Icon, Menu} from 'semantic-ui-react'
import {camelize} from 'humps'
import moment from 'moment'
import isString from 'lodash/isString'
import cx from 'classnames'


const Cell = ({item, column: {name, type, method}}) => {
  const key = camelize(name)
  const value = item[key]
  switch (type) {
    case 'date': return <DateCell {...{value, method}}/>
    case 'hidden': return <HiddenCell {...{value}}/>
    default: return <Table.Cell>{value}</Table.Cell>
  }
}

class HiddenCell extends React.Component { 
  state = {
    show: false
  }

  timer = null

  timeout = 3000

  componentWillUnmount() {
    if (this.timer && this.timer.clearTimeout)
      this.timer.clearTimeout()
  }

  canShow = () => {
    this.timer = setTimeout(this.cantShow, this.timeout)    
    this.setState({show: true})
  }

  cantShow = () => {
    this.timer = false
    this.setState({show: false})
  }
  
  render() {
    const {value} = this.props
    const {show} = this.state 
    const {canShow} = this 
    return (
      <Table.Cell>
        <span className={cx('pointer', 'disabled', {
          'active-to-disabled': show
        })}
          onClick={canShow}
        >
          <Icon name={show ? 'unhide' : 'hide'} color={show ? 'blue' : 'black'}/>        
        </span>
        <span>{show ? value : ''}</span>
      </Table.Cell>
    )
  }
}

const DateCell = ({value, method}) => 
  <Table.Cell>
    {isString(method) && moment()[method] ? moment(value)[method]() : moment(value).format('DD/MM/YYYY')}
  </Table.Cell>

const TableHoF = (columns, itemsPropTypes) => {
  const AppTable = ({onFetch, loading, items}) => 
    <Table celled>
      <Table.Header>
        <Table.Row>
        {columns.map(column => column.name).map(name => 
          <Table.HeaderCell key={name}>{name}</Table.HeaderCell>
        )}
        </Table.Row>
      </Table.Header>
      <Table.Body>
      {items.map((item, i) => 
        <Table.Row key={i}>
        {columns.map((column, k) => 
          <Cell key={`${i}.${k}`} item={item} column={column} />
        )}
        </Table.Row>
      )}
      </Table.Body>

      <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan={`${columns.length}`}>
          <Menu floated='right' pagination>
            <Menu.Item as='a' onClick={onFetch}>
              {loading ? <Icon loading name='spinner' /> : 'Más resultados'}
            </Menu.Item>
          </Menu>
          <Menu pagination>
            <Menu.Item>
              {`${items.length} elementos`}
            </Menu.Item>
          </Menu>
        </Table.HeaderCell>
      </Table.Row>
      </Table.Footer>
    </Table>

  AppTable.propTypes = {
    onFetch: T.func,
    loading: T.bool,
    items: itemsPropTypes,
  }

  return AppTable
}

export default TableHoF
