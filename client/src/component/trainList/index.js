import {Component} from 'react';
import '../../../style/train.less';
import TrainListHeader from './trainListHeader';
import TrainListBody from './trainListBody';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

class TrainList extends Component {
  render() {
    return (<div id="trainList">
      <TrainListHeader/>
      <TrainListBody/>
    </div>);
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(withRouter(TrainList));