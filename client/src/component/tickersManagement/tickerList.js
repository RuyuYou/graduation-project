import {Component} from 'react';
import superagent from 'superagent';
import noCache from 'superagent-no-cache';
import {Modal, Button} from 'react-bootstrap';
import {Link} from 'react-router';


const header = ['站序', '站名', '硬座票价', '软卧上铺', '软卧下铺', '硬卧上铺', '硬卧中铺', '硬卧下铺', '操作'];

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

export default class StationList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tickerList: [],
      showDeleteModal: false,
      deleteStationId: [],
      trainId: ''
    };
  }

  getStationList(next) {
    superagent
      .get(`/tickers/${next.trainId}`)
      .use(noCache)
      .end((err, res)=> {
        if (err) {
          throw err;
        }
        this.setState({
          tickerList: res.body.tickers,
          trainId: next.trainId
        }, ()=> {
          console.log(this.state.tickerList);
        });
      });
  }

  componentWillReceiveProps(next) {
    this.getStationList(next);
  }

  openDeleteStation(number) {
    const deleteStationId = [];
    deleteStationId.push(number);
    this.setState({
      showDeleteModal: true,
      deleteStationId
    });
  }

  cancelButton() {
    this.setState({
      showDeleteModal: false
    });
  }

  deleteStations() {
    this.setState({
      showDeleteModal: false
    }, ()=> {
      const trainIdArray = document.cookie.split('trainId=');
      this.state.deleteStationId.map((stationId)=> {
        superagent
          .delete(`stations/${trainIdArray[1]}/${stationId}`)
          .use(noCache)
          .end((err, res)=> {
            if (err) {
              throw err;
            }
            this.getStationList({trainId: trainIdArray[1]});
          });
      })
    });
  }

  judgeNumber(number) {
    if (number == -1) {
      return '终点';
    } else {
      return number
    }
  }

  render() {
    const tickerList = this.state.tickerList || [];
    const tickerListHTML = tickerList.map((item, index)=> {
      const href = `/ticker/${this.state.trainId}/edit/${item.number}`;
      return (
        <tr key={index}>
          <td>{this.judgeNumber(item.number)}</td>
          <td>{item.name}</td>
          <td>{item.seat}</td>
          <td>{item.soft.up}</td>
          <td>{item.soft.down}</td>
          <td>{item.hard.up}</td>
          <td>{item.hard.middle}</td>
          <td>{item.hard.down}</td>
          <td>
            <div>
              <Link to={href} className='margin-right'>站点票价详情
              </Link>
              <Link onClick={this.openDeleteStation.bind(this, item.number)}>
                <a href="#">删除站点票价</a>
              </Link>
            </div>
          </td>
        </tr>
      )
    });
    return (<div>
      <table className="table table-striped table-bordered table-hover">
        <thead>
        <ListHeader />
        </thead>
        <tbody>
        {tickerListHTML}
        </tbody>
      </table>

      <div className={this.state.showDeleteModal ? '' : 'hidden'}>
        <div className='static-modal'>

          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>删除提示</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              您确定要删除该站点信息吗？
            </Modal.Body>

            <Modal.Footer>
              <Button onClick={this.cancelButton.bind(this)}>取消</Button>
              <Button bsStyle='primary' onClick={this.deleteStations.bind(this)}>确定</Button>
            </Modal.Footer>

          </Modal.Dialog>
        </div>

      </div>
    </div>);
  }
}