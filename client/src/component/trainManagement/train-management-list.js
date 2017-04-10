import {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

class TrainManagementList extends Component {

  render() {
    return (
      <div className="train-management-list">
        <table className='table table-bordered table-striped text-left'>
          <thead>
          <tr>
            <th>列车号</th>
            <th>始发站</th>
            <th>终点站</th>
            <th>历时</th>
            <th>发车时间</th>
          </tr>
          </thead>
        </table>
      </div>
    )
  }
}


const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(withRouter(TrainManagementList));