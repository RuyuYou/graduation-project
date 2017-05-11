import {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';

const middlePlace = [];

export default class TrainEditorPlace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      middlePlace: [],
      middlePlaceError: '',
      showMiddlePlace: false,
      activeIndex: -1,
      showDeleteModal: false
    }
  }

  addMiddlePlace() {
    this.setState({
      showModal: true
    });
  }

  cancelButton() {
    this.setState({
      showModal: false,
      middlePlaceError: ''
    }, ()=> {
      this.middle.value = '';
    });
  }

  makeSureAdd() {
    if (this.state.activeIndex === -1) {
      if (this.middle.value != '') {
        const value = this.middle.value;
        middlePlace.push(value);
        this.setState({
          showModal: false,
          middlePlace: middlePlace,
          showMiddlePlace: true
        }, ()=> {
          this.middle.value = '';
        });
      } else {
        this.setState({
          middlePlaceError: '中间站不能为空'
        });
      }
    } else {
      if (this.middle.value != '') {
        const value = this.middle.value;
        middlePlace.splice(this.state.activeIndex, 1, value);
        this.setState({
          showModal: false,
          middlePlace: middlePlace,
          showMiddlePlace: true,
          activeIndex: -1
        }, ()=> {
          this.middle.value = '';
        });
      } else {
        this.setState({
          middlePlaceError: '中间站不能为空'
        });
      }
    }
  }

  hiddenErrorMessage() {
    this.setState({
      middlePlaceError: ''
    });
  }

  modifyMiddlePlace(item, index) {
    this.setState({
      showModal: true,
      activeIndex: index
    }, ()=> {
      this.middle.value = item;
    });
  }

  deleteMiddlePlace() {
    const newMiddlePlace = this.state.middlePlace;
    newMiddlePlace.splice(this.state.activeIndex, 1);
    this.setState({
      middlePlace: newMiddlePlace,
      activeIndex: -1,
      showDeleteModal: false
    });
  }

  openDeleteModal(index) {
    this.setState({
      showDeleteModal: true,
      activeIndex: index
    });
  }

  cancelMiddleButton() {
    this.setState({
      showDeleteModal: false,
      activeIndex: -1
    });
  }

  render() {
    const middlePlaceList = this.state.middlePlace || [];
    const middlePlaceHTML = middlePlaceList.map((item, index)=> {
      return <div className="row no-margin-left" key={index}>
        <div className='col-sm-offset-4'>
          <span className="read-only">{item}</span>
          <i className='fa fa-cog' onClick={this.modifyMiddlePlace.bind(this, item, index)}></i>
          <i className='fa fa-trash-o' onClick={this.openDeleteModal.bind(this, index)}> </i>
        </div>
      </div>
    });
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

      <div className="row">
        <label className={this.state.showMiddlePlace ? 'col-sm-4 control-label' : 'col-sm-4 control-label  hidden'}>
          始发站 </label>
        {middlePlaceHTML}
      </div>

      <div className="btn-left margin-top">
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
              <div className="form-group text-center margin-modal no-margin-bottom">
                <input type="text" className="form-control" placeholder="请输入中间站"
                       ref={(ref)=> {
                         this.middle = ref;
                       }} onFocus={this.hiddenErrorMessage.bind(this)}/>
              </div>
              <span className="error-tip text-center">{this.state.middlePlaceError}</span>
            </Modal.Body>

            <Modal.Footer>
              <Button onClick={this.cancelButton.bind(this)}>取消</Button>
              <Button bsStyle='primary' onClick={this.makeSureAdd.bind(this)}>确定</Button>
            </Modal.Footer>

          </Modal.Dialog>
        </div>

      </div>

      <div className={this.state.showDeleteModal ? '' : 'hidden'}>
        <div className='static-modal'>

          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>删除提示</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              您确定要删除该中间站吗？
            </Modal.Body>

            <Modal.Footer>
              <Button onClick={this.cancelMiddleButton.bind(this)}>取消</Button>
              <Button bsStyle='primary' onClick={this.deleteMiddlePlace.bind(this)}>确定</Button>
            </Modal.Footer>

          </Modal.Dialog>
        </div>

      </div>

      <div>

      </div>
    </div>);
  }
}