import {Component} from 'react';
import {Link, withRouter} from 'react-router';
import superagent from 'superagent';
import noCache from 'superagent-no-cache';
import {Modal, Button} from 'react-bootstrap';
import {connect} from 'react-redux';

class ErrorTip extends Component {
  render() {
    return (
      <div className="row margin-err">
        <span className='error-message'>{this.props.error}</span>
      </div>
    );
  }
}

class TrainEditorBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trainIdError: '',
      startTimeError: '',
      endPlaceError: '',
      endTimeError: '',
      showSuccess: false,
      trainInformation: {},
      showDeleteTrainModal: false
    };
  }

  componentDidMount() {
    const pathNameArray = window.location.pathname.split('/');
    superagent
      .get(`/trains/${pathNameArray[2]}`)
      .use(noCache)
      .end((err, res)=> {
        if (err) {
          throw err;
        }
        this.setState({
          trainInformation: res.body,
        }, ()=> {
          this.getEditorValue(this.state.trainInformation);
        });
      })
  }

  getEditorValue(trainInformation) {
    this.trainId.value = trainInformation.trainId;
    this.startPlace.value = trainInformation.startPlace;
    this.endPlace.value = trainInformation.endPlace;
    this.startHour.value = trainInformation.startTime.hour;
    this.startMinute.value = trainInformation.startTime.minute;
    this.endHour.value = trainInformation.endTime.hour;
    this.endMinute.value = trainInformation.endTime.minute;
    this.type.value = trainInformation.type;
  }

  judgeStartPlace() {
    if (this.startPlace.value == '') {
      this.setState({startPlaceError: '起点站不能为空'});
    }
  }

  hiddenErrorMessage(err1, err2) {
    var errObj = {};
    errObj[err1] = '';
    errObj[err2] = '';
    this.setState(errObj);
  }

  judgeStartTime() {
    if (this.state.startTime.year == -1 || this.state.startTime.month == -1 || this.state.startTime.day == -1 || this.state.startTime.hour == -1 || this.state.startTime.minute == -1) {
      this.setState({startTimeError: '发车时间不能为空'})
    }
  }

  judgeEndPlace() {
    if (this.endPlace.value == '') {
      this.setState({endPlaceError: '终点站不能为空'});
    }
  }

  judgeEndTime() {
    if (this.state.endTime.year == -1 || this.state.endTime.month == -1 || this.state.endTime.day == -1 || this.state.endTime.hour == -1 || this.state.endTime.minute == -1) {
      this.setState({
        endTimeError: '到达时间不能为空'
      });
    }
  }

  submit() {
    let startTime = this.state.startTime.month * 100000 + this.state.startTime.day * 1000
      + this.state.startTime.hour * 10 + this.state.startTime.minute;
    let endTime = this.state.endTime.month * 100000 + this.state.endTime.day * 1000
      + this.state.endTime.hour * 10 + this.state.endTime.minute;
    const timer = endTime - startTime;
    if (timer <= 0) {
      this.setState({
        endTimeError: '到达时间不能低于发车时间'
      });
    } else {
      const info = {
        trainId: this.trainId.value,
        startPlace: this.startPlace.value,
        startTime: this.state.startTime,
        endPlace: this.endPlace.value,
        endTime: this.state.endTime
      };

      superagent
        .put(`/trains/${this.state.trainInformation._id}`)
        .send(info)
        .use(noCache)
        .end((err, res)=> {
          if (err) {
            throw err;
          }
          if (res.status === 204) {
            this.setState({showSuccess: true}, ()=> {
              this.initInformation();
            });
          }
        });
    }
  }

  initInformation() {
    this.trainId.value = '';
    this.startPlace.value = '';
    this.endPlace.value = '';
    this.setState({
      startTime: {
        year: -1,
        month: -1,
        day: -1,
        hour: -1,
        minute: -1
      },
      endTime: {
        year: -1,
        month: -1,
        day: -1,
        hour: -1,
        minute: -1
      }
    });
  }

  openDeleteTrain() {
    this.setState({
      showDeleteTrainModal: true
    });
  }

  cancelDeleteTrain() {
    this.setState({
      showDeleteTrainModal: false
    });
  }

  deleteTrain() {
    superagent
      .delete(`/trains/${this.state.trainInformation._id}`)
      .use(noCache)
      .end((err, res)=> {
        if (err) {
          throw err;
        }
        if (res.status === 204) {
          this.setState({
            showDeleteTrainModal: false
          }, ()=> {
            this.props.router.push('/train');
          });
        }
      });
  }

  render() {
    const list = `/train`;
    return (<div>
      <div className='form-group row no-margin-form'>
        <label className='col-sm-4 control-label'> 列车号 </label>
        <div className='col-sm-1 no-padding-right'>
          <input type='text' className='form-control' disabled={true}
                 ref={(ref) => {
                   this.trainId = ref;
                 }}/>
        </div>
        <label className='col-lg-1 control-label'> 列车类型 </label>
        <div className='col-sm-1 no-padding-left'>
          <input type='text' className='form-control' disabled={true}
                 ref={(ref) => {
                   this.type = ref;
                 }}/>
        </div>
      </div>
      <ErrorTip error={this.state.trainIdError}/>

      <div className="form-group row no-margin-form">
        <label className='col-sm-4 control-label'> 起点站 </label>
        <div className='col-sm-6'>
          <input type='text' className='form-control width' placeholder='请输入起点站'
                 ref={(ref) => {
                   this.startPlace = ref;
                 }} onBlur={this.judgeStartPlace.bind(this)}
                 onFocus={this.hiddenErrorMessage.bind(this, 'startPlaceError')}/>
        </div>
      </div>
      <ErrorTip error={this.state.startPlaceError}/>

      <div className="form-group row no-margin-form">
        <label className='col-sm-4 control-label'> 终点站 </label>
        <div className='col-sm-6'>
          <input type='text' className='form-control width' placeholder='请输入终点站'
                 ref={(ref) => {
                   this.endPlace = ref;
                 }} onBlur={this.judgeEndPlace.bind(this)}
                 onFocus={this.hiddenErrorMessage.bind(this, 'endPlaceError')}/>
        </div>
      </div>
      <ErrorTip error={this.state.endPlaceError}/>

      <div className='form-group row no-margin-form'>
        <label className='col-sm-4 control-label'> 发车时间 </label>
        <div onBlur={this.judgeStartTime.bind(this)}
             onFocus={this.hiddenErrorMessage.bind(this, 'startTimeError', 'endTimeError')}>
          <div className="form-group col-sm-2 no-margin-form">
            <input type='text' className='form-control margin-right width'
                   ref={(ref) => {
                     this.startHour = ref;
                   }}/>时
          </div>
          <div className="form-group col-sm-2 no-margin-form">
            <input type='text' className='form-control margin-right width'
                   ref={(ref) => {
                     this.startMinute = ref;
                   }}/>分
          </div>
        </div>
      </div>
      <ErrorTip error={this.state.startTimeError}/>

      <div className='form-group row no-margin-form'>
        <label className='col-sm-4 control-label'> 到达时间 </label>
        <div onBlur={this.judgeStartTime.bind(this)}
             onFocus={this.hiddenErrorMessage.bind(this, 'startTimeError', 'endTimeError')}>
          <div className="form-group col-sm-2 no-margin-form">
            <input type='text' className='form-control margin-right width'
                   ref={(ref) => {
                     this.endHour = ref;
                   }}/>时
          </div>
          <div className="form-group col-sm-2 no-margin-form">
            <input type='text' className='form-control margin-right width'
                   ref={(ref) => {
                     this.endMinute = ref;
                   }}/>分
          </div>
        </div>
      </div>
      <ErrorTip error={this.state.endTimeError}/>


      <div className="split-border"></div>


      <div className="row margin-top">
        <div className='col-sm-3 width-left text-center'>
          <button className='btn btn-primary btn-save' onClick={this.submit.bind(this)}>
            {'保存  '}
          </button>
        </div>
        <div className='col-sm-3 col-sm-offset-1 text-center'>
          <button className='btn btn-primary btn-save'
                  onClick={this.openDeleteTrain.bind(this)}>
            {'删除  '}
          </button>
        </div>

        <div className={this.state.showSuccess ? '' : 'hidden'}>
          <div className='alert alert-block alert-success col-sm-6 col-sm-offset-3 no-margin-bottom text-center'>
            <p className='message-hint'>
              <i className='ace-icon fa fa-check-circle icon-space'> </i>
              {`车次修改成功,请返回车次列表`}
            </p>
            <Link to={list}>
              <button className='btn btn-sm btn-success icon-space'>查看车次列表
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className={this.state.showDeleteTrainModal ? '' : 'hidden'}>
        <div className='static-modal'>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>删除提示</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              您确定要删除该车次吗？
            </Modal.Body>

            <Modal.Footer>
              <Button onClick={this.cancelDeleteTrain.bind(this)}>取消</Button>
              <Button bsStyle='primary' onClick={this.deleteTrain.bind(this)}>确定</Button>
            </Modal.Footer>

          </Modal.Dialog>
        </div>

      </div>
    </div>);
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(withRouter(TrainEditorBody));