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
import TrainList from './component/trainList';
import TrainEditor from './component/trainEditor';
import Station from './component/station';
import Seat from './component/seat';
import Sleeper from './component/sleeper';
import UserManagement from './component/usersManagement';
import StationEditor from './component/stationEditor/index';

const store = createStore(
  rootReducer,
  applyMiddleware(createLogger(), thunkMiddleware)
);

class Main extends Component {

  render() {
    return (
      <Router history={browserHistory}>
        <Route path='/login' component={Login}/>
        <Route path='/' component={Layout}>
          <IndexRoute component={Home}/>
          <Route path='index' component={Home}/>
          <Route path='userCenter' component={UserCenter}/>
          <Route path='ticker' component={TickersManagement}/>
          <Route path='train'>
            <IndexRoute component={TrainList}/>
            <Router path='new' component={TrainEditor}/>
            <Router path=':id/edit' component={TrainEditor}/>
          </Route>
          <Route path='station'>
            <IndexRoute component={Station}/>
            <Router path="new" component={StationEditor}/>
            <Router path=":id/edit" component={StationEditor}/>
          </Route>
          <Route path="seat" component={Seat}/>
          <Route path="sleeper" component={Sleeper}/>
          <Route path='usersManagement' component={UserManagement}/>
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
