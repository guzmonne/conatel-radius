import React, {PropTypes as T} from 'react'
import {Grid, Card} from 'semantic-ui-react'
import LoginForm from './Form.js'

class Login extends React.Component {
  static propTypes = {
    onLogin: T.func.isRequired,
  }
  
  render() {
    const {onLogin} = this.props
    return (
      <Grid padded centered columns={2}>
        <Grid.Column>
          <h1 style={{textAlign: 'center'}}>CONATEL Radius</h1>        
          <Card>
            <h3 style={{margin: '0 auto', padding: '1em'}}>¡Bienvenido!</h3>
            <Card.Content>
              <LoginForm onSubmit={onLogin}/>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    )
  }
}

export default Login