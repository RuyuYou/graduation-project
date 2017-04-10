import {Component} from 'react';
import {render} from 'react-dom';
import {Router, Route, browserHistory, IndexRoute, withRouter} from 'react-router';
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {Provider, connect} from 'react-redux';
import createLogger from 'redux-logger';
import {cookie} from 'react-cookie-banner';
import Layout from './containers/menu/layout';
import rootReducer from './reducers/index.js';
import Login from './component/Login';
import Home from './component/menu/Home';
import UserCenter from './component/menu/UserCenter';
import TickersManagement from './component/tickersManagement';

const store = createStore(
  rootReducer,
  applyMiddleware(createLogger(), thunkMiddleware)
);

class Main extends Component {
  requireCookie(nextState, replace, next) {
    let authState = cookie('authState');
    if (authState !== '200') {
      replace('/login');
      next();
    }
    next();
  }

  render() {
    return (
      <Router history={browserHistory}>
        <Route path='/login' component={Login}/>
        <Route path='/' component={Layout}>
          <IndexRoute component={Home}/>
          <Route path='index' component={Home}/>
          <Route path='userCenter' component={UserCenter}/>
          <Route path='tickers' component={TickersManagement}/>
        </Route>
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
