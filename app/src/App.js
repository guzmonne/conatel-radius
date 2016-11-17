import React, { PropTypes as T, Component } from 'react';
import {Provider} from 'react-redux'
import Router from './Router.js'

class App extends Component {
  static props = {
    store: T.object.isRequired,
  }

  render() {
    return ( 
      <Provider store={this.props.store}>
        <Router />
      </Provider>
    )    
  }
}

export default App;
