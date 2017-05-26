import {Component} from 'react';

export default class SeatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTicker: {},
      activeIndex: -1
    }
  }

  clickSeat(index, information) {
    this.setState({
      currentTicker: information,
      activeIndex: index
    });
    this.props.changeTickers(information);
  }

  render() {

    const seatListHTML = this.props.seatList.map((item, index)=> {
      return <tbody key={index}>
      <tr onClick={this.clickSeat.bind(this, index, item)}>
        <td>{item.trainId}</td>
        <td>{item.position}</td>
        <td>{item.price}</td>
        <td>{item.createPeople}</td>
      </tr>
      </tbody>
    });

    return (
      <div className="seat-list">
        <table className='table table-bordered table-striped text-left'>
          <thead>
          <tr>
            <th>列车号</th>
            <th>位置</th>
            <th>价格</th>
            <th>创建人</th>
          </tr>
          </thead>
          {seatListHTML}
        </table>
      </div>);
  }
}