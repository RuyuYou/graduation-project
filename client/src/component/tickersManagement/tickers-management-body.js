import {Component} from 'react';
import superagent from 'superagent';
import noCache from 'superagent-no-cache';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import TickersManagementList from './tickers-management-list';
import TickersManagementEditor from './tickers-management-editor';

class TickersManagementBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tickerList: []
    }
  }

  componentDidMount() {
    superagent.get('/tickers')
      .use(noCache)
      .end((err, res)=> {
        if (err) {
          throw err;
        }
        this.setState(({
          tickerList: res.body
        }));
      });
  }

  render() {
    const tickerList = this.state.tickerList || [];
    return (
      <div className='tickers-management-body row'>
        <div className="col-sm-8">
          <TickersManagementList tickerList={this.state.tickerList}/>
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
