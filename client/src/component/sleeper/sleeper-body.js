import {Component} from 'react';
import superagent from 'superagent';
import noCache from 'superagent-no-cache';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import SleeperList from './sleeper-list';
import SleeperEditor from './sleeper-editor';

class SleeperBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sleeperList: [],
      currentTicker: {}
    };
  }

  requestData() {
    superagent.get('/sleepers')
      .use(noCache)
      .end((err, res)=> {
        if (err) {
          throw err;
        }
        this.setState({
          sleeperList: res.body
        });
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

  modifyTickers() {
    this.requestData();
    this.setState({
      currentTicker: {}
    });
  }

  render() {
    return (
      <div className="sleeper-body row">
        <div className="col-sm-8">
          <SleeperList sleeperList={this.state.sleeperList}
                    changeTickers={this.changeTickers.bind(this)}/>
        </div>
        <div className="col-sm-4">
          <SleeperEditor currentTicker={this.state.currentTicker}
                      modifyTickers={this.modifyTickers.bind(this)}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(withRouter(SleeperBody));
