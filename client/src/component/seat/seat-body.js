import {Component} from 'react';
import superagent from 'superagent';
import noCache from 'superagent-no-cache';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import SeatList from './seat-list';
import SeatEditor from './seat-editor';

class SeatBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seatList: []
    };
  }

  requestData() {
    superagent.get('/seats')
      .use(noCache)
      .end((err, res)=> {
        if (err) {
          throw err;
        }
        this.setState({
          seatList: res.body
        });
      });
  }

  componentDidMount() {
    this.requestData();
  }

  render() {
    return (
      <div className="seat-body row">
        <div className="col-sm-8">
          <SeatList seatList={this.state.seatList}/>
        </div>
        <div className="col-sm-4">
          <SeatEditor/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(withRouter(SeatBody));
