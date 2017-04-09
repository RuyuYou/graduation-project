import {combineReducers} from 'redux';
import isJumped from './login/login-reducer';
import errSent from './login/errSent';

const rootReducer = combineReducers({
  isJumped,
  errSent
});

export default rootReducer;
