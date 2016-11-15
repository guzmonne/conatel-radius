import React, {PropTypes as T} from 'react'
import {Grid, Card, Message} from 'semantic-ui-react'
import LoginForm from './Form.js'

class Login extends React.Component {
  static propTypes = {
    onLogin: T.func.isRequired,
    error: T.shape({
      message: T.string.isRequired,
      type: T.string,
    })
  }
  
  render() {
    let message
    const {onLogin, error, loading} = this.props
    if (error && error.message)
      message = error.type === 'invalid' ? 'Usuario o contraseña incorrecta.' : error.message
    return (
      <Grid padded centered columns={3}>
        <Grid.Column>
          <h1 style={{textAlign: 'center'}}>CONATEL Radius</h1>    
          <Card centered>  
            <h3 style={{margin: '0 auto', padding: '1em'}}>¡Bienvenido!</h3>
            <Card.Content>
            {message && 
              <Message negative header="Atención" content={message} />
            }  
              <LoginForm onSubmit={onLogin} loading={loading}/>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    )
  }
}

export default Login