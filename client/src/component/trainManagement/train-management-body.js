import {Component} from 'react';
import superagent from 'superagent';
import noCache from 'superagent-no-cache';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import TrainManagementList from './train-management-list';
import TrainManagementEditor from './train-management-editor';

class TrainManagementBody extends Component {

  render() {
    return (
      <div className='train-management-body row'>
        <div className="col-sm-8">
          <TrainManagementList/>
        </div>
        <div className="col-sm-4">
          <TrainManagementEditor/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(withRouter(TrainManagementBody));
