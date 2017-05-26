import {Component} from 'react';
import '../../../style/sleeper.less';
import SleeperBody from './sleeper-body';

export default class TickersManagement extends Component {
  render() {
    return (<div id='sleeper'>
      <div className='sleeper-header'>
        卧铺管理
      </div>
      <SleeperBody/>
    </div>);
  }
}