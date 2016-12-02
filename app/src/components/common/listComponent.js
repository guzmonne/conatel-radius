import React, {PropTypes as T} from 'react'
import {Modal, Button, Message} from 'semantic-ui-react'

const listComponent = ({className, createHeader, name, Table, Form, itemsInterface}) => {
  const ListComponent = ({onFetch, error, onClose, onOpen, ui, onCreate, loading, creating, items, limit, offset}) => {
    return (
      <div className={className}>
        <Modal size="small" open={ui.isOpenCreateModal} onClose={onClose}>
          <Modal.Header>{createHeader}</Modal.Header>
          <Modal.Content>
            <Form errorMessage={error} loading={creating} onSubmit={onCreate} />
          </Modal.Content>
        </Modal>
      {error && 
        <Message negative>
          <Message.Header>Error en el servidor</Message.Header>
          <p>{error}</p>
        </Message>
      }
        <Button primary onClick={onOpen}>Crear nuevo {name}</Button>
        <Table {...{items, loading, onFetch}} />
      </div>
    )
  }

  ListComponent.propTypes = {
    onFetch: T.func.isRequired,
    onCreate: T.func.isRequired,
    onClose: T.func.isRequired,
    onOpen: T.func.isRequired,
    loading: T.bool,
    creating: T.bool,
    items: itemsInterface,
    limit: T.number.isRequired,
    offset: T.number.isRequired,
    ui: T.shape({
      isOpenCreateModal: T.bool,
    }),
    error: T.string,
  }

  return ListComponent
}

export default listComponent
