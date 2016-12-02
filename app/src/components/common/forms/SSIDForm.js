import React, {PropTypes as T} from 'react'
import {Field, reduxForm} from 'redux-form'
import {Form, Button, Message} from 'semantic-ui-react'

const SSIDForm = ({handleSubmit, errorMessage, pristine, loading}) =>
  <Form error={!!errorMessage} loading={loading} onSubmit={handleSubmit}>
    <Message error content={errorMessage}/>
    <Form.Field>
      <label>Nombre</label>
      <Field name="name" component="input" placeholder='Nombre' type="text"/>
    </Form.Field>
    <Form.Field>
      <label>Fabricante</label>
      <Field name="vendor" component="input" type="text" placeholder="Fabricante" />
    </Form.Field>
    <Button primary loading={loading} type='submit' disabled={pristine || loading}>Crear SSID</Button>
  </Form>

SSIDForm.propTypes = {
  onSubmit: T.func.isRequired,
  loading: T.bool,
  errorMessage: T.string,
}

const SSIDReduxForm = reduxForm({
  form: 'ssid',
})(SSIDForm)

export default SSIDReduxForm
