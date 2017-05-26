import {Component} from 'react';
import '../../../style/seat.less';
import SeatBody from './seat-body';

export default class TickersManagement extends Component {
  render() {
    return (<div id='seat'>
      <div className='seat-header'>
        票务管理
      </div>
      <SeatBody/>
    </div>);
  }
}