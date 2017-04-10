import {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import TickersManagementList from './tickers-management-list';
import TickersManagementEditor from './tickers-management-editor';

class TickersManagementBody extends Component {
  render() {
    return (
      <div className='row'>
        <div className="col-sm-8">
          <TickersManagementList/>
        </div>
        <div className="col-sm-4">
          <TickersManagementEditor/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(withRouter(TickersManagementBody));
