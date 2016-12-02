import React, {PropTypes as T} from 'react'
import {UsersTable} from './common/tables/'
import {IUserItems} from './interfaces.js'
import {Modal, Button, Message} from 'semantic-ui-react'
import UserForm from './common/forms/UserForm.js'

const Admin = ({onFetch, error, onClose, onOpen, ui, onCreate, loading, creating, items, limit, offset}) => 
  <div className="Admin">
    <Modal size="small" open={ui.isOpenCreateModal} onClose={onClose}>
      <Modal.Header>Crear usuario</Modal.Header>
      <Modal.Content>
        <UserForm errorMessage={error} loading={creating} onSubmit={onCreate} />
      </Modal.Content>
    </Modal>
  {error && 
    <Message negative>
      <Message.Header>Error en el servidor</Message.Header>
      <p>{error}</p>
    </Message>
  }
    <Button primary onClick={onOpen}>Crear usuario</Button>
    <UsersTable {...{items, loading, onFetch}} />
  </div>

Admin.propTypes = {
  onFetch: T.func.isRequired,
  onCreate: T.func.isRequired,
  onClose: T.func.isRequired,
  onOpen: T.func.isRequired,
  loading: T.bool,
  creating: T.bool,
  items: IUserItems,
  limit: T.number.isRequired,
  offset: T.number.isRequired,
  ui: T.shape({
    isOpenCreateModal: T.bool,
  }),
  error: T.string,
}

export default Admin
