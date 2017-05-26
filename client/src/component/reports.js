import {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import '../../style/report.less';

class Reports extends Component {

  render() {
    const trainHref = `/report/train`;
    const tickerHref = `/report/ticker`;
    return (
      <div id="report">
        <div className='report-header'>
          报表管理
        </div>

        <div className='report-title row no-margin'>
          <div className="col-sm-offset-2 col-sm-4">
            <button className='btn btn-default'>
              <a href={trainHref}><i className='fa fa-share'></i>
                <span className='text'>车次报表 </span>
              </a>
            </button>
          </div>
          <div className="col-sm-offset-2 col-sm-4">
            <button className='btn btn-default'>
              <a href={tickerHref}><i className='fa fa-share'></i>
                <span className='text'>票价报表 </span>
              </a>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(withRouter(Reports));
