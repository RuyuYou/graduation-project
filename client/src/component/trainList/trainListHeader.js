import {Component} from 'react';

export default class TickerListHeader extends Component {
  render() {
    return (
      <div>
        <div className='trainList-header'>
          车次管理
        </div>

        <div className='trainList-title'>
          <button className='btn btn-default'>
            <i className='fa fa-plus blue'> </i>
            <span className='text'>新增车次 </span>
          </button>
          <button className='btn btn-default'>
            <i className='fa fa-trash-o red'> </i>
            <span className='text'>批量删除 </span>
          </button>
        </div>
      </div>
    );
  }
}