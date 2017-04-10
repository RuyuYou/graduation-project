import {Component} from 'react';

import {connect} from 'react-redux';
import {withRouter} from 'react-router';

class TickersManagementList extends Component {
  render() {
    return (
      <div>
        <table className='table table-bordered table-striped text-left'>
          <thead>
          <tr>
            <th>始发地</th>
            <th>到达地</th>
            <th>历时</th>
            <th>硬座</th>
            <th>软座</th>
            <th>日期</th>
          </tr>
          </thead>
        </table>
      </div>
    )
  }
}


const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(withRouter(TickersManagementList));