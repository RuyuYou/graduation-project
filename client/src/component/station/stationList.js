import {Component} from 'react';
import superagent from 'superagent';
import noCache from 'superagent-no-cache';
import {Modal, Button} from 'react-bootstrap';
import {Link} from 'react-router';


const header = ['列车号', '途经站点', '创建人', '操作'];

class ListHeader extends Component {
  render() {
    const title = header.map((item, index)=> {
      return (<th key={index}>{item}</th>)
    });
    return (
      <tr>
        <th><input type="checkbox"/></th>
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

  getStationList() {
    superagent
      .get('/stations')
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

  componentDidMount() {
    this.getStationList();
  }

  getStations(stations) {
    let stationsHTML = '';
    stations.map((item, index)=> {
      if (index == 0) {
        stationsHTML += item.station;
      } else {
        stationsHTML += `,${item.station}`;
      }
    });
    return stationsHTML;
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

  render() {
    const stationsHTML = this.state.stationList.map((item, index)=> {
      const stationHTML = this.getStations(item.stations);
      return (
        <tr key={index}>
          <td><input type="checkbox"/></td>
          <td>{item.trainId}</td>
          <td>{stationHTML}</td>
          <td>{item.createPeople}</td>
          <td>
            <div>
              <a href="/station/edit" className='margin-right'>站点详情</a>
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