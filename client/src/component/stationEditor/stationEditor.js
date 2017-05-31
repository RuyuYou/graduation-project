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

class StationEditor extends Component {
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
      days: -1,
      seatError: '',
      hardUpError: '',
      hardMiddleError: '',
      hardDownError: '',
      softUpError: '',
      softDownError: ''
    };
  }

  componentDidMount() {
    const cookieArray = document.cookie.split('trainId=');
    const pathArray = window.location.pathname.split('/edit/');
    console.log(pathArray);
    this.trainId.value = cookieArray[1];
    superagent
      .get(`/stations/${cookieArray[1]}/${pathArray[1]}`)
      .use(noCache)
      .end((err, res)=> {
        if (err) {
          throw err;
        }
        this.getTrainValue(res.body);
      });
  }

  getTrainValue(station) {
    console.log(station);
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

  judgeNumber() {
    if (this.number.value == '') {
      this.setState({numberError: '站序不能为空'});
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

  handleChangeDays(event) {
    const value = event.target.value;
    this.setState({
      days: value
    });
  }

  render() {
    const list = `/train`;
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
      <ErrorTip error={this.state.startPlaceError}/>

      <div className="form-group row no-margin-form">
        <label className='col-sm-4 control-label'> 站点名称 </label>
        <div className='col-sm-6'>
          <input type='text' className='form-control width' placeholder='请输入终点站'
                 ref={(ref) => {
                   this.name = ref;
                 }} onBlur={this.judgeEndPlace.bind(this)}
                 onFocus={this.hiddenErrorMessage.bind(this, 'endPlaceError')}/>
        </div>
      </div>
      <ErrorTip error={this.state.endPlaceError}/>

      <div className='form-group row no-margin-form'>
        <label className='col-sm-4 control-label'> 运行时间 </label>
        <div onBlur={this.judgeStartTime.bind(this)}
             onFocus={this.hiddenErrorMessage.bind(this, 'startTimeError', 'endTimeError')}>
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

        </div>
      </div>
      <ErrorTip error={this.state.endTimeError}/>

      <div className='form-group row no-margin-form'>
        <label className='col-sm-4 control-label'> 发车时间 </label>
        <div>
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
      <ErrorTip error={this.state.lastedError}/>

      <div className="form-group row no-margin-form">
        <label className='col-sm-4 control-label'> 停车时间 </label>
        <div className="form-group col-sm-2 no-margin-form">
          <input type='text' className='form-control margin-right width'
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
        <button className='btn btn-primary btn-save' onClick={this.submit.bind(this)}>
          {'保存  '}
        </button>
      </div>

    </div>);
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(withRouter(StationEditor));