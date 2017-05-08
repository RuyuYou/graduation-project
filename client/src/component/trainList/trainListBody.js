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
      showModal: false
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
    this.setState({
      showModal: true
    });
    superagent.delete(`/trains/${id}`)
      .use(noCache)
      .end((err, res)=> {
        if (err) {
          throw err;
        }
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
      this.getTrainList();
    });
  }

  render() {
    const trainList = this.state.trainList || [];
    const listHTML = trainList.map((item, index)=> {
      const updatePath = window.location.pathname + '/edit';
      return (
        <tr key={index}>
          <td><input type="checkbox"/></td>
          <td>{item.trainId}</td>
          <td>{item.lastedTime}</td>
          <td>{item.startTime}</td>
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