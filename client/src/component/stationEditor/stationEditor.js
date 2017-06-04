import {Component} from 'react';
import {Link, withRouter} from 'react-router';
import superagent from 'superagent';
import noCache from 'superagent-no-cache';
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

class StationEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSuccess: false,
      trainInformation: {},
      showDeleteTrainModal: false,
      days: -1,
      seatError: '',
      hardUpError: '',
      hardMiddleError: '',
      hardDownError: '',
      softUpError: '',
      softDownError: '',
      editOrNew: 0
    };
  }

  componentDidMount() {
    const cookieArray = document.cookie.split('trainId=');
    const pathArray = window.location.pathname.split('/edit/');
    const pathNameArray = window.location.pathname.split('/');
    this.trainId.value = cookieArray[1];
    if (pathNameArray[pathNameArray.length - 2] === 'edit') {
      superagent
        .get(`/stations/${cookieArray[1]}/${pathArray[1]}`)
        .use(noCache)
        .end((err, res)=> {
          if (err) {
            throw err;
          }
          this.getTrainValue(res.body);
          this.getTickerValue(res.body);
          this.setState({
            editOrNew: 1
          });
        });
    }
  }

  getTrainValue(station) {
    this.number.value = station.number;
    this.name.value = station.name;
    this.lastedHour.value = station.lastedTime.hour;
    this.lastedMinute.value = station.lastedTime.minute;
    this.endHour.value = station.endTime.hour;
    this.endMinute.value = station.endTime.minute;
    this.leaveHour.value = station.leaveTime.hour;
    this.leaveMinute.value = station.leaveTime.minute;
    this.parkTime.value = station.parkTime;
    this.mile.value = station.mile;
    this.setState({
      days: station.days
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

  hiddenErrorMessage(err1, err2) {
    var errObj = {};
    errObj[err1] = '';
    errObj[err2] = '';
    this.setState(errObj);
  }

  judgeNumber() {
    if (this.number.value == '') {
      this.setState({numberError: '站序不能为空'});
    } else {
      if (isNaN(this.number.value)) {
        this.setState({numberError: '站序只能为数字'});
      }
    }
  }

  judgeName() {
    if (this.name.value == '') {
      this.setState({nameError: '站点名称不能为空'});
    }
  }

  judgeLastedTime() {
    if (this.lastedMinute.value == '' || this.lastedHour.value == '') {
      this.setState({lastedError: '运行时间不能为空'});
    } else {
      if (isNaN(this.lastedHour.value) || isNaN(this.lastedMinute.value)) {
        this.setState({lastedError: '运行时间只能为数字'});
      }
    }
  }

  judgeEndTime() {
    if (this.endMinute.value == '' || this.endHour.value == '') {
      this.setState({endError: '到达时间不能为空'});
    } else {
      if (isNaN(this.endHour.value) || isNaN(this.endMinute.value)) {
        this.setState({endError: '到达时间只能为数字'});
      }
    }
  }

  judgeLeaveTime() {
    if (this.leaveMinute.value == '' || this.leaveHour.value == '') {
      this.setState({leaveError: '离开时间不能为空'});
    } else {
      if (isNaN(this.leaveHour.value) || isNaN(this.leaveMinute.value)) {
        this.setState({leaveError: '离开时间只能为数字'});
      } else {
        const endTime = parseInt(this.endHour.value) * 60 + parseInt(this.endMinute.value);
        const leaveTime = parseInt(this.leaveHour.value) * 60 + parseInt(this.leaveMinute.value);
        const parkTime = leaveTime - endTime;
        this.parkTime.value = parkTime;
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
    const stationInfo = {
      number: this.number.value,
      name: this.name.value,
      lastedTime: {
        hour: this.lastedHour.value,
        minute: this.lastedMinute.value
      },
      endTime: {
        hour: this.endHour.value,
        minute: this.endMinute.value
      },
      leaveTime: {
        hour: this.leaveHour.value,
        minute: this.leaveMinute.value
      },
      parkTime: this.parkTime.value,
      days: this.state.days,
      mile: this.mile.value,
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
    if (this.state.editOrNew == 1) {
      superagent
        .put(`/stations/${this.trainId.value}/${this.number.value}`)
        .send(stationInfo)
        .use(noCache)
        .end((err, res)=> {
          if (err) {
            throw err;
          }
          if (res.status === 200) {
            this.initInformation();
          }
        });
    } else {
      superagent
        .post(`stations/${this.trainId.value}`)
        .use(noCache)
        .end((err, res)=> {
          if (err) {
            throw err;
          }
          if (res.status === 201) {
            this.initInformation();
          }
        });
    }
  }

  initInformation() {
    this.trainId.value = '';
    this.number.value = '';
    this.name.value = '';
    this.leaveHour.value = '';
    this.leaveMinute.value = '';
    this.endHour.value = '';
    this.endMinute.value = '';
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
      days: '',
      showSuccess: true
    });
  }

  handleChangeDays(event) {
    const value = event.target.value;
    this.setState({
      days: value
    });
  }


  returnList() {
    const pathName = window.location.pathname;
    const pathArray = pathName.split('/K84');
    this.props.router.push(pathArray[0]);
  }

  render() {
    const messageSuccess = this.state.editOrNew == 0 ? `新建` : `修改`;
    const list = `/station`;
    return (<div>
      <div className='form-group row margin-bottom'>
        <label className='col-sm-4 control-label'> 列车号 </label>
        <div className='col-sm-1 no-padding-right'>
          <input type='text' className='form-control' disabled={true}
                 ref={(ref) => {
                   this.trainId = ref;
                 }}/>
        </div>
      </div>

      <div className="form-group row no-margin-form">
        <label className='col-sm-4 control-label'> 站序 </label>
        <div className='col-sm-6'>
          <input type='text' className='form-control width'
                 ref={(ref) => {
                   this.number = ref;
                 }} onBlur={this.judgeNumber.bind(this)}
                 onFocus={this.hiddenErrorMessage.bind(this, 'numberError')}/>
        </div>
      </div>
      <ErrorTip error={this.state.numberError}/>

      <div className="form-group row no-margin-form">
        <label className='col-sm-4 control-label'> 站点名称 </label>
        <div className='col-sm-6'>
          <input type='text' className='form-control width' placeholder='请输入终点站'
                 ref={(ref) => {
                   this.name = ref;
                 }} onBlur={this.judgeName.bind(this)}
                 onFocus={this.hiddenErrorMessage.bind(this, 'nameError')}/>
        </div>
      </div>
      <ErrorTip error={this.state.nameError}/>

      <div className='form-group row no-margin-form'>
        <label className='col-sm-4 control-label'> 运行时间 </label>
        <div onBlur={this.judgeLastedTime.bind()}
             onFocus={this.hiddenErrorMessage.bind(this, 'lastedRrror')}>
          <div className="form-group col-sm-2 no-margin-form">
            <input type='text' className='form-control margin-right width'
                   ref={(ref) => {
                     this.lastedHour = ref;
                   }}/>时
          </div>
          <div className="form-group col-sm-2 no-margin-form">
            <input type='text' className='form-control margin-right width'
                   ref={(ref) => {
                     this.lastedMinute = ref;
                   }}/>分
          </div>
        </div>
      </div>
      <ErrorTip error={this.state.lastedError}/>

      <div className='form-group row no-margin-form'>
        <label className='col-sm-4 control-label'> 到达时间 </label>
        <div onBlur={this.judgeEndTime.bind(this)}
             onFocus={this.hiddenErrorMessage.bind(this, 'endError')}>
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
      <ErrorTip error={this.state.endError}/>

      <div className='form-group row no-margin-form'>
        <label className='col-sm-4 control-label'> 发车时间 </label>
        <div onBlur={this.judgeLeaveTime.bind(this)}
             onFocus={this.hiddenErrorMessage.bind(this, 'leaveError')}>
          <div className="form-group col-sm-2 no-margin-form">
            <input type='text' className='form-control margin-right width'
                   ref={(ref) => {
                     this.leaveHour = ref;
                   }}/>时
          </div>
          <div className="form-group col-sm-2 no-margin-form">
            <input type='text' className='form-control margin-right width'
                   ref={(ref) => {
                     this.leaveMinute = ref;
                   }}/>分
          </div>
        </div>
      </div>
      <ErrorTip error={this.state.leaveError}/>

      <div className="form-group row no-margin-form">
        <label className='col-sm-4 control-label'> 停车时间 </label>
        <div className="form-group col-sm-2 no-margin-form">
          <input type='text' className='form-control margin-right width' disabled={true}
                 ref={(ref) => {
                   this.parkTime = ref;
                 }}/>分
        </div>
      </div>
      <ErrorTip error={this.state.lastedError}/>


      <div className='form-group row margin-bottom'>
        <label className='col-sm-4 control-label'> 日期 </label>
        <div className='form-group col-sm-2'>
          <select className="form-control width province" name="year"
                  value={this.state.days}
                  onChange={this.handleChangeDays.bind(this)}>
            <option value="-1">请选择</option>
            <option value="0">当天</option>
            <option value="1">+1天</option>
            <option value="2">+2天</option>
          </select>
        </div>
      </div>

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

      <div className="row margin-top text-center">
        <div className='col-sm-3 width-left text-center'>
          <button className='btn btn-primary btn-save' onClick={this.submit.bind(this)}>
            {'保存  '}
          </button>
        </div>
        <div className='col-sm-3 col-sm-offset-1 text-center'>
          <button className='btn btn-primary btn-save'
                  onClick={this.returnList.bind(this)}>
            {'返回  '}
          </button>
        </div>

        <div className={this.state.showSuccess ? '' : 'hidden'}>
          <div className='alert alert-block alert-success col-sm-6 col-sm-offset-3 no-margin-bottom text-center'>
            <p className='message-hint'>
              <i className='ace-icon fa fa-check-circle icon-space'> </i>
              {`途经站点${messageSuccess}成功,请返回`}
            </p>
            <Link to={list}>
              <button className='btn btn-sm btn-success icon-space'>查看车次列表
              </button>
            </Link>
          </div>
        </div>
      </div>


    </div>);
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(withRouter(StationEditor));