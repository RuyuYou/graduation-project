import {Component} from 'react';

import {connect} from 'react-redux';
import {withRouter} from 'react-router';

class TickersManagementList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTicker: {},
      activeIndex: -1
    };
  }

  clickTickers(index, information) {
    this.setState({
      currentTicker: information,
      activeIndex: index
    });
    this.props.changeTickers(information);
  }

  render() {
    const TickerList = this.props.tickerList.map((item, index)=> {
      const active = this.state.currentTicker._id === item._id ? 'info' : '';
      return <tbody key={index}>
      <tr onClick={this.clickTickers.bind(this, index, item)} className={'user-tickers-tab ' + active}>
        <td>{item.trainId}</td>
        <td>{item.cabinNumber}</td>
        <td>{item.sleeperNumber}</td>
        <td>{item.seatNumber}</td>
      </tr>
      </tbody>
    });
    return (
      <div className="tickers-management-list">
        <table className='table table-bordered table-striped text-left'>
          <thead>
          <tr>
            <th>列车号</th>
            <th>车厢总数</th>
            <th>卧铺个数</th>
            <th>硬座个数</th>
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