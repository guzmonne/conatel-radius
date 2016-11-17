import React, {PropTypes as T} from 'react'
import {Table, Icon, Menu} from 'semantic-ui-react'
import {camelize} from 'humps'

const TableHoF = (headers, itemsPropTypes) => {
  const AppTable = ({onMore, loading, items}) => 
    <Table celled>
      <Table.Header>
        <Table.Row>
        {headers.map(header => 
          <Table.HeaderCell key={header}>{header}</Table.HeaderCell>
        )}
        </Table.Row>
      </Table.Header>

      <Table.Body>
      {items.map((item, i) => 
        <Table.Row key={i}>
        {headers.map(header => camelize(header)).map(key => 
          <Table.Cell key={key}>{item && item[key]}</Table.Cell>
        )}
        </Table.Row>
      )}
      </Table.Body>

      <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan={`${headers.length}`}>
          <Menu floated='right' pagination>
            <Menu.Item as='a' onClick={onMore}>
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
    onMore: T.func,
    loading: T.bool,
    items: itemsPropTypes,
  }

  return AppTable
}

export default TableHoF
