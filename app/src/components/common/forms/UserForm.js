import React, {PropTypes as T} from 'react'
import {Field, reduxForm} from 'redux-form'
import {Form, Button} from 'semantic-ui-react'

const UserForm = ({handleSubmit, pristine, loading}) =>
  <Form onSubmit={handleSubmit}>
    <Form.Field>
      <label>Usuario</label>
      <Field name="username" disabled={loading} component="input" placeholder='Usuario' type="text"/>
    </Form.Field>
    <Form.Field>
      <label>Email</label>
      <Field name="email" disabled={loading} component="input" type="text" placeholder="Email" />
    </Form.Field>
    <Form.Field>
      <label>Telefono</label>
      <Field name="phone" disabled={loading} component="input" placeholder='Telefono' type="text"/>
    </Form.Field>
    <Form.Field>
      <label>Contraseña</label>
      <Field name="password" disabled={loading} component="input" placeholder='Contraseña' type="password"/>
    </Form.Field>
    <Button primary loading={loading} type='submit' disabled={pristine || loading}>Crear Usuario</Button>
  </Form>

UserForm.propTypes = {
  onSubmit: T.func.isRequired,
  loading: T.bool,
}

const UserReduxForm = reduxForm({
  form: 'user',
})(UserForm)

export default UserReduxForm
