import {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';

export default class TrainEditorPlace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      middlePlace: []
    }
  }

  addMiddlePlace() {
    this.setState({
      showModal: true
    });
  }

  cancelButton() {
    this.setState({
      showModal: false
    });
  }

  makeSureAdd() {

  }

  render() {
    return (<div>
      <div className="form-group row margin-top">
        <label className='col-sm-4 control-label'> 始发站 </label>
        <div className='col-sm-6'>
          <input type='text' className='form-control' placeholder='请输入始发站'
                 ref={(ref) => {
                   this.startPlace = ref;
                 }}/>
        </div>
      </div>

      <div className="form-group row margin-top">
        <label className='col-sm-4 control-label'> 终点站 </label>
        <div className='col-sm-6'>
          <input type='text' className='form-control' placeholder='请输入终点站'
                 ref={(ref) => {
                   this.endPlace = ref;
                 }}/>
        </div>
      </div>

      <div className="text-center margin-top">
        <button className="btn btn-primary"
                onClick={this.addMiddlePlace.bind(this)}>
          点击添加中间站
        </button>
      </div>

      <div className={this.state.showModal ? '' : 'hidden'}>
        <div className='static-modal'>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>添加中间站</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <div className="form-group text-center margin-modal">
                <input type="text" className="form-control" placeholder="请输入中间站"/>
              </div>
            </Modal.Body>

            <Modal.Footer>
              <Button onClick={this.cancelButton.bind(this)}>取消</Button>
              <Button bsStyle='primary' onClick={this.makeSureAdd.bind(this)}>确定</Button>
            </Modal.Footer>

          </Modal.Dialog>
        </div>

      </div>
    </div>);
  }
}