import {Component} from 'react';
import '../../../style/station.less';
import StationList from './stationList';

export default class Station extends Component {
  render() {
    return (<div id="seat">
      <div className='seat-header'>
        站点管理
      </div>
      <div className="station-title">
        <button className='btn btn-default'>
          <i className='fa fa-plus blue'> </i>
          <span className='text'>新增站点 </span>
        </button>
      </div>
      <StationList/>
    </div>);
  }
}