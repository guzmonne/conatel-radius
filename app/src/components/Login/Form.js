import React, {PropTypes as T} from 'react'
import {Form, Button} from 'semantic-ui-react'

class LoginForm extends React.Component {
  static propTypes = {
    onSubmit: T.func.isRequired,
  }

  static defaultProps = {
    onSubmit: () => {},
  }

  state = { serializedForm: {} }

  handleChange = (e, { value }) => this.setState({ value })

  handleSubmit = (e, serializedForm) => {
    e.preventDefault()
    this.props.onSubmit(serializedForm)
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Input 
          label="Usuario"
          type="text"
          name="username"
          placeholder="Usuario"
        />
        <Form.Input 
          label="Contraseña"
          type="password"
          name="password"
          placeholder="Contraseña"
        />
        <Button type='submit'>Iniciar Sesión</Button>
      </Form>
    )
  }
}

export default LoginForm
