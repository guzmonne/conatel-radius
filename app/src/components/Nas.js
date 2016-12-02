import React, {PropTypes as T} from 'react'
import {NasTable} from './common/tables/'
import {IUserItems} from './interfaces.js'
import {Modal, Button, Message} from 'semantic-ui-react'
import NasForm from './common/forms/NasForm.js'

const Nas = ({onFetch, error, onClose, onOpen, ui, onCreate, loading, creating, items, limit, offset}) => 
  <div className="Nas">
    <Modal size="small" open={ui.isOpenCreateModal} onClose={onClose}>
      <Modal.Header>Crear nuevo Nas</Modal.Header>
      <Modal.Content>
        <NasForm errorMessage={error} loading={creating} onSubmit={onCreate} />
      </Modal.Content>
    </Modal>
  {error && 
    <Message negative>
      <Message.Header>Error en el servidor</Message.Header>
      <p>{error}</p>
    </Message>
  }
    <Button primary onClick={onOpen}>Crear nuevo Nas</Button>
    <NasTable {...{items, loading, onFetch}} />
  </div>

Nas.propTypes = {
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

export default Nas