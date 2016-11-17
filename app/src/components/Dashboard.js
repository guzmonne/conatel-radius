import React, {PropTypes as T} from 'react'
import {UsersTable} from './common/tables/'
import {IUserItems} from './interfaces.js'
import {Menu, Modal} from 'semantic-ui-react'
import UserForm from './common/forms/UserForm.js'

const Dashboard = ({onLoad, onClose, onOpen, open, onCreate, loading, creating, items, limit, offset}) => {
  const onMore = (e) => {
    e.preventDefault()
    if (loading) return
    onLoad()
  }
  
  return (
    <div className="Dashboard">
      <Modal open={open} onClose={onClose}>
        <Modal.Header>Crear usuario</Modal.Header>
        <Modal.Content>
          <UserForm loading={creating} onSubmit={onCreate} />
        </Modal.Content>
      </Modal>
      <Menu secondary>
        <Menu.Item name="Crear usuario" as={'a'} onClick={onOpen} />
      </Menu>
      <UsersTable {...{items, loading, onMore}} />
    </div>
  )
}

Dashboard.propTypes = {
  onLoad: T.func.isRequired,
  onCreate: T.func.isRequired,
  onClose: T.func.isRequired,
  onOpen: T.func.isRequired,
  loading: T.bool,
  creating: T.bool,
  items: IUserItems,
  limit: T.number.isRequired,
  offset: T.number.isRequired,
  open: T.bool,
}

export default Dashboard
