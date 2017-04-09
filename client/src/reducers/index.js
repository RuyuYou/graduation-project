import {combineReducers} from 'redux';
import isJumped from './login/login-reducer';
import errSent from './login/errSent';
import navigator from './menu/left-nav';
import breadcrumb from './menu/breadcrumb';
import leftNav from './menu/left-nav';

const rootReducer = combineReducers({
  isJumped,
  errSent,
  navigator,
  breadcrumb,
  leftNav
});

export default rootReducer;
