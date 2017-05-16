import {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

class TrainListHeader extends Component {

  addTrain() {
    const pathName = window.location.pathname;
    this.props.router.push(pathName + '/new');
  }

  render() {
    const href = `/report`;
    return (
      <div>
        <div className='trainList-header'>
          车次管理
        </div>

        <div className='trainList-title'>
          <button className='btn btn-default'
                  onClick={this.addTrain.bind(this)}>
            <i className='fa fa-plus blue'> </i>
            <span className='text'>新增车次 </span>
          </button>
          <button className='btn btn-default pull-right'>
            <a href={href}><i className='fa fa-share'></i>
              <span className='text'>生成报表 </span>
            </a>
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(withRouter(TrainListHeader));
