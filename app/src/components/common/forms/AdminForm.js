import React, {PropTypes as T} from 'react'
import {Field, reduxForm} from 'redux-form'
import {Form, Button, Message} from 'semantic-ui-react'

const AdminForm = ({handleSubmit, errorMessage, pristine, loading}) =>
  <Form error={!!errorMessage} loading={loading} onSubmit={handleSubmit}>
    <Message error content={errorMessage}/>
    <Form.Field>
      <label>Usuario</label>
      <Field name="username" component="input" placeholder='Usuario' type="text"/>
    </Form.Field>
    <Form.Field>
      <label>Email</label>
      <Field name="email" component="input" type="text" placeholder="Email" />
    </Form.Field>
    <Form.Field>
      <label>Telefono</label>
      <Field name="phone" component="input" placeholder='Telefono' type="text"/>
    </Form.Field>
    <Form.Field>
      <label>Contraseña</label>
      <Field name="password" component="input" placeholder='Contraseña' type="password"/>
    </Form.Field>
    <Form.Field>
      <label><Field name="role" component="input" type="radio" value="admin"/>{' Admin'}</label>
      <label><Field name="role" component="input" type="radio" value="ambassador"/>{' Guest Ambassador'}</label>  
    </Form.Field> 
    <Button primary loading={loading} type='submit' disabled={pristine || loading}>Crear administrador</Button>
  </Form>

AdminForm.propTypes = {
  onSubmit: T.func.isRequired,
  loading: T.bool,
  errorMessage: T.string,
}

const AdminReduxForm = reduxForm({
  form: 'user',
})(AdminForm)

export default AdminReduxForm
