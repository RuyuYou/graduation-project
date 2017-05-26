import {Component} from 'react';
import superagent from 'superagent';
import noCache from 'superagent-no-cache';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

class SeatBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seatList: []
    };
  }

  requestData() {
    superagent.get('/tickers')
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
      <div className="seat-body">
        
      </div>
    )
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(withRouter(SeatBody));
