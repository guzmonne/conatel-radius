import React, {PropTypes as T} from 'react'
import {Field, reduxForm} from 'redux-form'
import {Form, Button, Message} from 'semantic-ui-react'

const NasForm = ({handleSubmit, errorMessage, pristine, loading}) =>
  <Form error={!!errorMessage} loading={loading} onSubmit={handleSubmit}>
    <Message error content={errorMessage}/>
    <Form.Field>
      <label>IP/Subred</label>
      <Field name="nasname" component="input" placeholder='IP/Subred' type="text"/>
    </Form.Field>
    <Form.Field>
      <label>Nombre</label>
      <Field name="shortname" component="input" type="text" placeholder="Nombre" />
    </Form.Field>
    <Form.Field>
      <label>Secreto</label>
      <Field name="secret" component="input" placeholder='Secreto' type="text"/>
    </Form.Field>
    <Form.Field>
      <label>Descripción</label>
      <Field name="description" component="input" placeholder='Descripción' type="text"/>
    </Form.Field>
    <Button primary loading={loading} type='submit' disabled={pristine || loading}>Crear cliente</Button>
  </Form>

NasForm.propTypes = {
  onSubmit: T.func.isRequired,
  loading: T.bool,
  errorMessage: T.string,
}

const NasReduxForm = reduxForm({
  form: 'nas',
})(NasForm)

export default NasReduxForm
