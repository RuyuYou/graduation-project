import {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import '../../style/report.less';
import {Modal, Button} from 'react-bootstrap';
import superagent from 'superagent';
import noCache from 'superagent-no-cache';

const header = ['列车号'];

class ListHeader extends Component {
  render() {
    const title = header.map((item, index)=> {
      return (<th key={index}>{item}</th>)
    });
    return (
      <tr>
        {title}
      </tr>
    )
  }
}

class Reports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTrainModal: false,
      trainIdList: [],
      showTickerModal: false
    };
  }

  openTrain() {
    this.setState({
      showTrainModal: true
    }, ()=> {
      this.getTrainList();
    });
  }

  openTicker() {
    this.setState({
      showTickerModal: true
    }, ()=> {
      this.getTrainList();
    });
  }

  reportList() {
    this.setState({
      showTrainModal: false,
      showTickerModal: false
    });
  }

  getTrainList() {
    superagent
      .get('/trains')
      .use(noCache)
      .end((err, res)=> {
        if (err) {
          throw err;
        }
        const trainIdList = [];
        console.log(res.body);
        res.body.map((item, index)=> {
          trainIdList.push(item.trainId);
        });

        this.setState({trainIdList});
      });

  }

  render() {
    const trainIdList = this.state.trainIdList || [];
    const trainIdListHTML1 = trainIdList.map((item, index)=> {
      return (
        <tr key={index}>
          <td><a href={`/report/train/${item}`}>{item}</a>
          </td>
        </tr>
      )
    });
    const trainIdListHTML2 = trainIdList.map((item, index)=> {
      return (
        <tr key={index}>
          <td><a href={`/report/ticker/${item}`}>{item}</a>
          </td>
        </tr>
      )
    });
    return (
      <div id="report">
        <div className='report-header'>
          报表管理
        </div>

        <div className='report-title row no-margin'>
          <div className="col-sm-offset-2 col-sm-4">
            <button className='btn btn-default' onClick={this.openTrain.bind(this)}>
              <i className='fa fa-share'></i>
              <span className='text'>车次报表 </span>
            </button>
          </div>
          <div className="col-sm-offset-2 col-sm-4">
            <button className='btn btn-default' onClick={this.openTicker.bind(this)}>
              <i className='fa fa-share'></i>
              <span className='text'>票价报表 </span>
            </button>
          </div>
        </div>

        <div className={this.state.showTrainModal ? '' : 'hidden'}>
          <div className='static-modal'>

            <Modal.Dialog>
              <Modal.Header>
                <Modal.Title>车次提示</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                请选择列车号：
                <table className="table table-striped table-bordered table-hover">
                  <thead>
                  <ListHeader />
                  </thead>
                  <tbody>
                  {trainIdListHTML1}
                  </tbody>
                </table>
              </Modal.Body>

              <Modal.Footer>
                <Button bsStyle='primary' onClick={this.reportList.bind(this)}>确定</Button>
              </Modal.Footer>

            </Modal.Dialog>
          </div>

        </div>

        <div className={this.state.showTickerModal ? '' : 'hidden'}>
          <div className='static-modal'>

            <Modal.Dialog>
              <Modal.Header>
                <Modal.Title>车次提示</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                请选择列车号：
                <table className="table table-striped table-bordered table-hover">
                  <thead>
                  <ListHeader />
                  </thead>
                  <tbody>
                  {trainIdListHTML2}
                  </tbody>
                </table>
              </Modal.Body>

              <Modal.Footer>
                <Button bsStyle='primary' onClick={this.reportList.bind(this)}>确定</Button>
              </Modal.Footer>

            </Modal.Dialog>
          </div>

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(withRouter(Reports));
