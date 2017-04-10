import {Component} from 'react';
import '../../../style/train-manage.less';
import TrainManagementHeader from './train-management-header';
import TrainManagementBody from './train-management-body';

export default class TickersManagement extends Component {
  render() {
    return (<div id='train-management'>
      <TrainManagementHeader/>
      <TrainManagementBody/>
    </div>);
  }
}