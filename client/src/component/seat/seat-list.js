import {Component} from 'react';

export default class SeatList extends Component {
  render() {
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
        </table>
      </div>);
  }
}