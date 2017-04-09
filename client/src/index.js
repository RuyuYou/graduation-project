import {Component} from 'react';
import {render} from 'react-dom';
import {Router, Route, browserHistory, IndexRoute, withRouter} from 'react-router';
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {Provider, connect} from 'react-redux';
import createLogger from 'redux-logger';
import {cookie} from 'react-cookie-banner';
import rootReducer from './reducers/index.js';
import Login from './component/Login';

const store = createStore(
  rootReducer,
  applyMiddleware(createLogger(), thunkMiddleware)
);

class Main extends Component {
  requireCookie(nextState, replace, next) {
    let authState = cookie('authState');
    if (authState !== '200') {
      replace(URI_PREFIX + '/login');
      next();
    }
    next();
  }

  render() {
    return (
      <Router history={browserHistory}>
        <Route path='/login' component={Login}/>
      </Router>
    );
  }
}

const mapStateToProps = (state) => state;

let RootApp = connect(mapStateToProps)(withRouter(Main));

render(
  <Provider store={store}>
    <RootApp/>
  </Provider>,
  document.getElementById('app'));
