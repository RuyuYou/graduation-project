import {Component} from 'react';
import '../../../style/station.less';
import StationList from './stationList';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';


class Station extends Component {

  addStation() {
    const pathName = window.location.pathname;
    this.props.router.push(pathName + '/new');
  }

  render() {
    return (<div id="station">
      <div className='station-header'>
        站点管理
      </div>
      <div className="station-title">
        <button className='btn btn-default'
                onClick={this.addStation.bind(this)}>
          <i className='fa fa-plus blue'> </i>
          <span className='text'>新增站点 </span>
        </button>
      </div>
      <StationList/>
    </div>);
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(withRouter(Station));