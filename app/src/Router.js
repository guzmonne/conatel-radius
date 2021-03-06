import React from 'react'
import {Router as ReactRouter, Route, IndexRoute, browserHistory} from 'react-router'
import Cookie from 'js.cookie'
import Login from './components/Login/'
import Main from './components/Main/'
import Dashboard from './containers/Dashboard.js'
import Signup from './components/Signup/'
import Nas from './containers/Nas.js'
import SSID from './containers/SSID.js'
import Admins from './containers/Admins.js'


class Router extends React.Component {

  authorized = (nextState, replace) => {
    const user = Cookie.get('user')
    if (!user)
      replace('/login')
  }

  render() {
    return (
      <ReactRouter history={browserHistory}>
        <Route path="/login" component={Login} />
        <Route path="/" component={Main} onEnter={this.authorized}>
          <IndexRoute component={Dashboard}/>
          <Route path="signup" component={Signup}/>
          <Route path="nas" component={Nas}/>
          <Route path="ssid" component={SSID}/>
          <Route path="admins" component={Admins}/>
        </Route>
      </ReactRouter>
    )
  }
}

export default Router
