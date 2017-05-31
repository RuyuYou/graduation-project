import {Component} from 'react';
import superagent from 'superagent';
import noCache from 'superagent-no-cache';
import {Modal, Button} from 'react-bootstrap';
import {Link} from 'react-router';


const header = ['站序', '站名', '到达时间', '发车时间', '停车时间', '运行时间', '里程', '日期', '操作'];

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
      stationList: [],
      showDeleteModal: false,
      deleteStationId: []
    };
  }

  getStationList(next) {
    superagent
      .get(`/stations/${next.trainId}`)
      .use(noCache)
      .end((err, res)=> {
        if (err) {
          throw err;
        }
        this.setState({
          stationList: res.body
        });
      });
  }

  componentWillReceiveProps(next) {
    this.getStationList(next);
  }

  openDeleteStation(id) {
    const deleteStationId = [];
    deleteStationId.push(id);
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
      this.state.deleteStationId.map((stationId)=> {
        superagent
          .delete(`stations/${stationId}`)
          .use(noCache)
          .end((err, res)=> {
            if (err) {
              throw err;
            }
            this.getStationList();
          });
      })
    });
  }

  judgeDays(days) {
    if (days == 0) {
      return '当天';
    } else {
      return `第${days}天`;
    }
  }

  render() {
    const stationList = this.state.stationList || [];
    console.log(this.state.stationList);
    const stationsHTML = stationList.map((item, index)=> {
      console.log(item);
      const href = `/station/${item.trainId}/edit`;
      const endTime = `${item.endTime.hour}时${item.endTime.minute}分`;
      const leaveTime = `${item.leaveTime.hour}时${item.leaveTime.minute}分`;
      const lastedTime = `${item.lastedTime.hour}时${item.lastedTime.minute}分`;
      return (
        <tr key={index}>
          <td>{item.number}</td>
          <td>{item.name}</td>
          <td>{endTime}</td>
          <td>{leaveTime}</td>
          <td>{item.parkTime}</td>
          <td>{lastedTime}</td>
          <td>{item.mile}</td>
          <td>{this.judgeDays(item.leaveTime.days)}</td>
          <td>
            <div>
              <Link to={href} className='margin-right'>站点详情
              </Link>
              <Link onClick={this.openDeleteStation.bind(this, item._id)}>
                <a href="#">删除站点</a>
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
        {stationsHTML}
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