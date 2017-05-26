import {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

class TrainListHeader extends Component {

  addTrain() {
    const pathName = window.location.pathname;
    this.props.router.push(pathName + '/new');
  }

  render() {
    const href = `/report/train`;
    return (
      <div>
        <div className='trainList-header'>
          报表管理
        </div>

        <div className='trainList-title'>
          <button className='btn btn-default pull-right'>
            <a href={href}><i className='fa fa-share'></i>
              <span className='text'>车次报表 </span>
            </a>
          </button>
          <button className='btn btn-default pull-right'>
            <a href={href}><i className='fa fa-share'></i>
              <span className='text'>车次报表 </span>
            </a>
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(withRouter(TrainListHeader));
