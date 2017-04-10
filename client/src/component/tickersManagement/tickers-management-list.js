import {Component} from 'react';

import {connect} from 'react-redux';
import {withRouter} from 'react-router';

class TickersManagementList extends Component {

  render() {
    const TickerList = this.props.tickerList.map((item, index)=> {
      return <tbody key={index}>
      <tr>
        <td>{item.trainId}</td>
        <td>{item.startPlace}</td>
        <td>{item.endPlace}</td>
        <td>{item.lasted}</td>
        <td>{item.hardSeat}</td>
        <td>{item.softSeat}</td>
        <td>{item.createDate}</td>
      </tr>
      </tbody>
    });
    return (
      <div className="tickers-management-list">
        <table className='table table-bordered table-striped text-left'>
          <thead>
          <tr>
            <th>列车号</th>
            <th>始发地</th>
            <th>到达地</th>
            <th>历时</th>
            <th>硬座</th>
            <th>软座</th>
            <th>发车时间</th>
          </tr>
          </thead>
          {TickerList}
        </table>
      </div>
    )
  }
}


const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(withRouter(TickersManagementList));