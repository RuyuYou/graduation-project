import {Component} from 'react';

export default class Title extends Component {
  render() {
    return (
      <div id='login-title'>
        <h1 className='text-center'>
          <i className='fa fa-leaf'></i>
          <span className='red'>火车售票系统</span>
        </h1>
        <div className='blue text-center'>
          © 后台管理
        </div>
      </div>
    );
  }
}
