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
      startPlaceError: '',
      startTimeError: '',
      endPlaceError: '',
      endTimeError: '',
      lastedError: '',
      showSuccess: false,
      trainInformation: {},
      showDeleteTrainModal: false,
      endDays: -1,
      seatError: '',
      hardUpError: '',
      hardMiddleError: '',
      hardDownError: '',
      softUpError: '',
      softDownError: '',
      editOrNew: false
    };
  }

  componentDidMount() {
    const pathNameArray = window.location.pathname.split('/');
    if (pathNameArray[pathNameArray.length - 1] == 'edit') {
      superagent
        .get(`/trains/${pathNameArray[2]}`)
        .use(noCache)
        .end((err, res)=> {
          if (err) {
            throw err;
          }
          this.getTrainValue(res.body);
          superagent.get(`/tickers/${pathNameArray[2]}`)
            .use(noCache)
            .end((err, res)=> {
              if (err) {
                throw err;
              }
              this.getTickerValue(res.body);
              this.setState({editOrNew: true});
            });
        });
    } else {
      this.setState({editOrNew: false});
    }
  }

  getTrainValue(trainInformation) {
    this.trainId.value = trainInformation.trainId;
    this.startPlace.value = trainInformation.startPlace;
    this.endPlace.value = trainInformation.endPlace;
    this.startHour.value = trainInformation.startTime.hour;
    this.startMinute.value = trainInformation.startTime.minute;
    this.endHour.value = trainInformation.endTime.hour;
    this.endMinute.value = trainInformation.endTime.minute;
    this.type.value = trainInformation.type;
    this.lastedHour.value = trainInformation.lastedTime.hour;
    this.lastedMinute.value = trainInformation.lastedTime.minute;
    this.mile.value = trainInformation.mile;
    this.setState({
      endDays: trainInformation.endTime.days
    });
  }

  getTickerValue(ticker) {
    this.seat.value = ticker.seat.toFixed(1);
    this.hardUp.value = ticker.hard.up.toFixed(1);
    this.hardMiddle.value = ticker.hard.middle.toFixed(1);
    this.hardDown.value = ticker.hard.down.toFixed(1);
    this.softUp.value = ticker.soft.up.toFixed(1);
    this.softDown.value = ticker.soft.down.toFixed(1);
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
    if (this.startMinute.value == '' || this.startHour.value == '') {
      this.setState({startTimeError: '发车时间不能为空'});
    } else {
      if (isNaN(this.startHour.value) || isNaN(this.startMinute.value)) {
        this.setState({startTimeError: '发车时间输入错误，请从新输入'});
      }
    }
  }

  judgeEndPlace() {
    if (this.endPlace.value == '') {
      this.setState({endPlaceError: '终点站不能为空'});
    }
  }

  judgeEndTime() {
    if (this.endMinute.value == '' || this.endHour.value == '') {
      this.setState({endTimeError: '到达时间不能为空'});
    } else {
      if (isNaN(this.endHour.value) || isNaN(this.endMinute.value)) {
        this.setState({endTimeError: '到达时间只能为数字'});
      } else {
        const startTime = parseInt(this.startHour.value) * 60 + parseInt(this.startMinute.value);
        const endTime = (parseInt(this.state.endDays) * 24 + parseInt(this.endHour.value)) * 60 + parseInt(this.endMinute.value);
        const lastedTime = endTime - startTime;
        this.lastedHour.value = parseInt(lastedTime / 60);
        this.lastedMinute.value = parseInt(lastedTime % 60);
      }
    }
  }

  judgeSeat() {
    if (this.seat.value == '') {
      this.setState({seatError: '硬座价格不能为空'});
    } else {
      if (isNaN(this.seat.value)) {
        this.setState({seatError: '硬座价格只能为数字'})
      }
    }
  }

  judgeHardUp() {
    if (this.hardUp.value == '') {
      this.setState({hardUpError: '硬卧上铺价格不能为空'});
    } else {
      if (isNaN(this.hardUp.value)) {
        this.setState({hardUpError: '硬卧上铺价格只能为数字'})
      }
    }
  }

  judgeHardMiddle() {
    if (this.hardMiddle.value == '') {
      this.setState({hardMiddleError: '硬卧中铺价格不能为空'});
    } else {
      if (isNaN(this.hardMiddle.value)) {
        this.setState({hardMiddleError: '硬卧中铺价格只能为数字'})
      }
    }
  }

  judgeHardDown() {
    if (this.hardDown.value == '') {
      this.setState({hardDownError: '硬卧下铺价格不能为空'});
    } else {
      if (isNaN(this.hardDown.value)) {
        this.setState({hardDownError: '硬卧下铺价格只能为数字'})
      }
    }
  }

  judgeSoftUp() {
    if (this.softUp.value == '') {
      this.setState({softUpError: '软卧上铺价格不能为空'});
    } else {
      if (isNaN(this.softUp.value)) {
        this.setState({softUpError: '软卧上铺价格只能为数字'})
      }
    }
  }

  judgeSoftDown() {
    if (this.softDown.value == '') {
      this.setState({softDownError: '软卧下铺价格不能为空'});
    } else {
      if (isNaN(this.softDown.value)) {
        this.setState({softDownError: '软卧下铺价格只能为数字'})
      }
    }
  }


  submit() {
    const trainInfo = {
      trainId: this.trainId.value,
      type: this.type.value,
      startPlace: this.startPlace.value,
      startTime: {
        hour: this.startHour.value,
        minute: this.startMinute.value
      },
      endPlace: this.endPlace.value,
      endTime: {
        hour: this.endHour.value,
        minute: this.endMinute.value,
        days: this.state.endDays
      },
      lastedTime: {
        hour: this.startHour.value,
        minute: this.lastedMinute.value
      },
      mile: this.mile.value
    };
    const tickerInfo = {
      trainId: this.trainId.value,
      seat: this.seat.value,
      hard: {
        up: this.hardUp.value,
        middle: this.hardMiddle.value,
        down: this.hardDown.value
      },
      soft: {
        up: this.softUp.value,
        down: this.softDown.value
      }
    };
    superagent
      .put(`/trains/${this.trainId.value}`)
      .send(trainInfo)
      .use(noCache)
      .end((err, res)=> {
        if (err) {
          throw err;
        }
        if (res.status === 204) {
          superagent
            .put(`/tickers/${this.trainId.value}`)
            .send(tickerInfo)
            .use(noCache)
            .end((err, res)=> {
              if (res.status === 200) {
                this.setState({showSuccess: true}, ()=> {
                  this.initInformation();
                });
              }
            });
        }
      });
  }

  initInformation() {
    this.trainId.value = '';
    this.startPlace.value = '';
    this.endPlace.value = '';
    this.startHour.value = '';
    this.startMinute.value = '';
    this.endHour.value = '';
    this.endMinute.value = '';
    this.type.value = '';
    this.lastedHour.value = '';
    this.lastedMinute.value = '';
    this.mile.value = '';
    this.seat.value = '';
    this.hardUp.value = '';
    this.hardMiddle.value = '';
    this.hardDown.value = '';
    this.softUp.value = '';
    this.softDown.value = '';
    this.setState({
      endDays: ''
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
      .delete(`/trains/${this.trainId.value}`)
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

  handleChangeEndDays(event) {
    const value = event.target.value;
    this.setState({
      endDays: value
    });
  }

  render() {
    const list = `/train`;
    return (<div>
      <div className='form-group row margin-bottom'>
        <label className='col-sm-4 control-label'> 列车号 </label>
        <div className='col-sm-1 no-padding-right'>
          <input type='text' className='form-control' disabled={this.state.editOrNew}
                 ref={(ref) => {
                   this.trainId = ref;
                 }}/>
        </div>
        <label className='col-lg-1 control-label'> 列车类型 </label>
        <div className='col-sm-1 no-padding-left'>
          <input type='text' className='form-control' disabled={this.state.editOrNew}
                 ref={(ref) => {
                   this.type = ref;
                 }}/>
        </div>
      </div>

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
        <div onBlur={this.judgeEndTime.bind(this)}
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
          <div className='form-group col-sm-2'>
            <select className="form-control width province" name="year"
                    value={this.state.endDays}
                    onChange={this.handleChangeEndDays.bind(this)}>
              <option value="-1">请选择</option>
              <option value="0">当天</option>
              <option value="1">+1天</option>
              <option value="2">+2天</option>
            </select>
          </div>
        </div>
      </div>
      <ErrorTip error={this.state.endTimeError}/>

      <div className='form-group row no-margin-form'>
        <label className='col-sm-4 control-label'> 运行时间 </label>
        <div>
          <div className="form-group col-sm-2 no-margin-form">
            <input type='text' className='form-control margin-right width' disabled={true}
                   ref={(ref) => {
                     this.lastedHour = ref;
                   }}/>时
          </div>
          <div className="form-group col-sm-2 no-margin-form">
            <input type='text' className='form-control margin-right width' disabled={true}
                   ref={(ref) => {
                     this.lastedMinute = ref;
                   }}/>分
          </div>
        </div>
      </div>
      <ErrorTip error={this.state.lastedError}/>

      <div className="form-group row no-margin-form">
        <label className='col-sm-4 control-label'> 里程 </label>
        <div className='col-sm-6'>
          <input type='text' className='form-control width' placeholder=''
                 ref={(ref) => {
                   this.mile = ref;
                 }}/> 公里
        </div>
      </div>

      <div className="split-border"></div>

      <div className="form-group row no-margin-form">
        <label className='col-sm-4 control-label'> 硬座票价 </label>
        <div className='col-sm-6'>
          <input type='text' className='form-control width'
                 ref={(ref) => {
                   this.seat = ref;
                 }} onBlur={this.judgeSeat.bind(this)}
                 onFocus={this.hiddenErrorMessage.bind(this, 'seatError')}/>
        </div>
      </div>
      <ErrorTip error={this.state.seatError}/>


      <div className="form-group row no-margin-form">
        <label className='col-sm-4 control-label'> 硬卧上铺 </label>
        <div className='col-sm-6'>
          <input type='text' className='form-control width'
                 ref={(ref) => {
                   this.hardUp = ref;
                 }} onBlur={this.judgeHardUp.bind(this)}
                 onFocus={this.hiddenErrorMessage.bind(this, 'hardUpError')}/>
        </div>
      </div>
      <ErrorTip error={this.state.hardUpError}/>


      <div className="form-group row no-margin-form">
        <label className='col-sm-4 control-label'> 硬卧中铺 </label>
        <div className='col-sm-6'>
          <input type='text' className='form-control width'
                 ref={(ref) => {
                   this.hardMiddle = ref;
                 }} onBlur={this.judgeHardMiddle.bind(this)}
                 onFocus={this.hiddenErrorMessage.bind(this, 'hardMiddleError')}/>
        </div>
      </div>
      <ErrorTip error={this.state.hardMiddleError}/>

      <div className="form-group row no-margin-form">
        <label className='col-sm-4 control-label'> 硬卧下铺 </label>
        <div className='col-sm-6'>
          <input type='text' className='form-control width'
                 ref={(ref) => {
                   this.hardDown = ref;
                 }} onBlur={this.judgeHardDown.bind(this)}
                 onFocus={this.hiddenErrorMessage.bind(this, 'hardDownError')}/>
        </div>
      </div>
      <ErrorTip error={this.state.hardDownError}/>


      <div className="form-group row no-margin-form">
        <label className='col-sm-4 control-label'> 软卧上铺 </label>
        <div className='col-sm-6'>
          <input type='text' className='form-control width'
                 ref={(ref) => {
                   this.softUp = ref;
                 }} onBlur={this.judgeSoftUp.bind(this)}
                 onFocus={this.hiddenErrorMessage.bind(this, 'softUpError')}/>
        </div>
      </div>
      <ErrorTip error={this.state.softUpError}/>


      <div className="form-group row no-margin-form">
        <label className='col-sm-4 control-label'> 软卧下铺 </label>
        <div className='col-sm-6'>
          <input type='text' className='form-control width'
                 ref={(ref) => {
                   this.softDown = ref;
                 }} onBlur={this.judgeSoftDown.bind(this)}
                 onFocus={this.hiddenErrorMessage.bind(this, 'softDownError')}/>
        </div>
      </div>
      <ErrorTip error={this.state.softDownError}/>

      <div className="row margin-top">
        <div className='col-sm-3 width-left text-center'>
          <button className='btn btn-primary btn-save' onClick={this.submit.bind(this)}>
            {'保存  '}
          </button>
        </div>
        <div className='col-sm-3 col-sm-offset-1 text-center'>
          <button className='btn btn-primary btn-save' disabled={!this.state.editOrNew}
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