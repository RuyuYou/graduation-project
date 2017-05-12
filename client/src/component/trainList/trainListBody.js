import {Component} from 'react';
import superagent from 'superagent';
import {Link} from 'react-router';
import noCache from 'superagent-no-cache';
import {Modal, Button} from 'react-bootstrap';

const header = ['列车号', '总时长', '发车时间', '始发地', '终点站', '中间站', '操作'];

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

export default class TrainListBody extends Component {

  constructor(props) {
    super(props);
    this.state = {
      trainList: [],
      showModal: false,
      deleteIdArray: []
    };
  }

  getTrainList() {
    superagent.get('/trains')
      .use(noCache)
      .end((err, res)=> {
        if (err) {
          throw err;
        }
        this.setState({
          trainList: res.body
        });
      });
  }

  componentDidMount() {
    this.getTrainList();
  }

  deleteTrain(id) {
    const newArray = [];
    newArray.push(id);
    this.setState({
      showModal: true,
      deleteIdArray: newArray
    });
  }

  cancelButton() {
    this.setState({
      showModal: false
    });
  }

  deleteTrains() {
    this.setState({
      showModal: false
    }, ()=> {
      this.state.deleteIdArray.map((id)=> {
        superagent.delete(`/trains/${id}`)
          .use(noCache)
          .end((err, res)=> {
            if (err) {
              throw err;
            }
          });
      });
      this.getTrainList();
    });
  }

  render() {
    const trainList = this.state.trainList || [];
    const listHTML = trainList.map((item, index)=> {
      const updatePath = window.location.pathname + `/${item._id}/edit`;
      const lastedTime = `${item.lastedTime.hour}小时${item.lastedTime.minutes}分钟`;
      const startTime = `${item.startTime.year}年${item.startTime.month}月${item.startTime.day}日
${item.startTime.hour}时${item.startTime.minutes}分`;
      return (
        <tr key={index}>
          <td><input type="checkbox"/></td>
          <td>{item.trainId}</td>
          <td>{lastedTime}</td>
          <td>{startTime}</td>
          <td>{item.startPlace}</td>
          <td>{item.endPlace}</td>
          <td>{item.middlePlace}</td>
          <td>
            <div className='action-buttons'>
              <Link to={updatePath}>
                <i className={'fa fa-pencil bigger pencil-green'}> </i>
              </Link>
              <i className='fa fa-trash-o bigger' onClick={this.deleteTrain.bind(this, item._id)}> </i>
            </div>
          </td>
        </tr>
      );
    });
    return (<div>
      <table className="table table-striped table-bordered table-hover">
        <thead>
        <ListHeader />
        </thead>
        <tbody>
        {listHTML}
        </tbody>
      </table>
      <div className={this.state.showModal ? '' : 'hidden'}>
        <div className='static-modal'>

          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>删除提示</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              您确定要删除该车次吗？
            </Modal.Body>

            <Modal.Footer>
              <Button onClick={this.cancelButton.bind(this)}>取消</Button>
              <Button bsStyle='primary' onClick={this.deleteTrains.bind(this)}>确定</Button>
            </Modal.Footer>

          </Modal.Dialog>
        </div>

      </div>
    </div>);
  }
}