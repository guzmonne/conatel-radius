import React, {PropTypes as T} from 'react'
import {Grid, Menu, Image, Dropdown} from 'semantic-ui-react'
import Cookie from 'js.cookie'
import logo from '../../_styles/_svg/logo.svg'

const Component = ({onLogout, replace, children}) =>
  <div className="Main">
    <Menu stackable>
      <Menu.Item>
        <Image src={logo} alt="Conatel Logo" size="small"/>
      </Menu.Item>
      <Dropdown text={Cookie.get('user').username} className='link item right'>
        <Dropdown.Menu>
          <Dropdown.Item>Cuenta</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={onLogout}>Cerrar Sesión</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Menu>
    <Grid padded>
      <Grid.Row>
      <Grid.Column width={document.body.offsetWidth < 1300 ? 4 : 2}>
        <Menu fluid vertical>
          <Menu.Item name="dashboard" active={location.pathname === '/'} onClick={() => replace('/')}>
            Dashboard
          </Menu.Item>
          <Menu.Item name="users" active={location.pathname === '/users'} onClick={() => replace('/users')}>
            Usuarios
          </Menu.Item>
          <Menu.Item name="networks" active={location.pathname === '/networks'} onClick={() => replace('/networks')}>
            Redes
          </Menu.Item>
          <Menu.Item name="clients" active={location.pathname === '/nas'} onClick={() => replace('/nas')}>
            Clientes
          </Menu.Item>
          <Menu.Item name="admins" active={location.pathname === '/admins'} onClick={() => replace('/admins')}>
            Administradores 
          </Menu.Item>
        </Menu>
      </Grid.Column>
      <Grid.Column width={document.body.offsetWidth < 1300 ? 12 : 14}>
        {children}
      </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>

Component.propTypes = {
  onLogout: T.func.isRequired,
  replace: T.func,
}

Component.defaultProps = {
  replace: () => {},
}

export default Component