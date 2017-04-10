import {Component} from 'react';
import '../../../style/tickers-manage.less';
import TickersManagementHeader from './tickers-management-header';
import TickersManagementBody from './tickers-management-body';

export default class TickersManagement extends Component {
  render() {
    return (<div id='tickers-management'>
      <TickersManagementHeader/>
      <TickersManagementBody/>
    </div>);
  }
}