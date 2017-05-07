import {Component} from 'react';
import '../../../style/train.less';
import TrainListHeader from './trainListHeader';


export default class TickersManagement extends Component {
  render() {
    return (<div id="trainList">
      <TrainListHeader/>
    </div>);
  }
}