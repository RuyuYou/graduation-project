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
      tickerList: [],
      currentTicker: {}
    }
  }

  requestData() {
    superagent.get('/tickers')
      .use(noCache)
      .end((err, res)=> {
        if (err) {
          throw err;
        }
        this.setState({
          tickerList: res.body
        });
      });
  }

  modifyTickers() {
    this.requestData();
    this.setState({
      currentTicker: {}
    });
  }

  componentDidMount() {
    this.requestData();
  }

  changeTickers(tricker) {
    this.setState({
      currentTicker: tricker
    });
  }

  render() {
    return (
      <div className='tickers-management-body row'>
        <div className="col-sm-8">
          <TickersManagementList tickerList={this.state.tickerList}
                                 changeTickers={this.changeTickers.bind(this)}/>
        </div>
        <div className="col-sm-4">
          <TickersManagementEditor currentTicker={this.state.currentTicker}
                                   modifyTickers={this.modifyTickers.bind(this)}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(withRouter(TickersManagementBody));
