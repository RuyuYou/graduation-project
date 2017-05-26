import {Component} from 'react';
import {Link, withRouter} from 'react-router';
import superagent from 'superagent';
import noCache from 'superagent-no-cache';

class ErrorTip extends Component {
  render() {
    return (
      <div className="row margin-err">
        <span className='error-message'>{this.props.error}</span>
      </div>
    );
  }
}

export default class TrainEditorBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trainIdError: '',
      startTime: {
        year: -1,
        month: -1,
        day: -1,
        hour: -1,
        minute: -1
      },
      startTimeError: '',
      endPlaceError: '',
      endTime: {
        year: -1,
        month: -1,
        day: -1,
        hour: -1,
        minute: -1
      },
      endTimeError: '',
      showSuccess: false,
      trainInformation: {}
    };
  }

  componentDidMount() {
    const pathNameArray = window.location.pathname.split('/');
    if (pathNameArray[pathNameArray.length - 1] === 'edit') {
      superagent
        .get(`/trains/${pathNameArray[2]}`)
        .use(noCache)
        .end((err, res)=> {
          if (err) {
            throw err;
          }
          this.setState({
            trainInformation: res.body,
            editOrNew: 1
          }, ()=> {
            this.getEditorValue(this.state.trainInformation);
          });
        })
    } else {
      this.setState({
        trainInformation: {},
        editOrNew: 0
      });
    }
  }

  getEditorValue(trainInformation) {
    console.log(trainInformation);
    this.trainId.value = trainInformation.trainId;
    this.startPlace.value = trainInformation.startPlace;
    this.endPlace.value = trainInformation.endPlace;
    this.setState({
      startTime: trainInformation.startTime,
      endTime: trainInformation.endTime
    });
  }

  judgeTrainId() {
    if (this.trainId.value == '') {
      this.setState({
        trainIdError: '列车号不能为空'
      });
    }
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

  getOptionMonth() {
    const nowDate = new Date();
    const month = nowDate.getMonth();
    const optionMonth = [];
    for (let i = month; i < 12; i++) {
      optionMonth.push(<option key={i} value={i + 1}>{i + 1}</option>)
    }
    return optionMonth;
  }

  getOptionDay() {
    const nowDate = new Date();
    const month = nowDate.getMonth() + 1;
    const optionDay = [];
    if (this.state.startTime.month == month) {
      const date = nowDate.getDate();
      for (let i = date + 1; i <= 31; i++) {
        optionDay.push(<option key={i} value={i}>{i}</option>)
      }
    } else if (this.state.startTime.month == 6 || this.state.startTime.month == 9 || this.state.startTime.month == 11) {
      for (let i = 0; i < 30; i++) {
        optionDay.push(<option key={i + 1} value={i + 1}>{i + 1}</option>)
      }
    } else {
      for (let i = 0; i < 31; i++) {
        optionDay.push(<option key={i + 1} value={i + 1}>{i + 1}</option>)
      }
    }
    return optionDay;
  }

  getOptionHour() {
    const optionHour = [];
    for (let i = 0; i <= 24; i++) {
      optionHour.push(<option key={i} value={i}>{i}</option>)
    }
    return optionHour;
  }

  getOptionMinute() {
    const optionMinute = [];
    for (let i = -1; i < 60; i++) {
      optionMinute.push(<option key={i + 1} value={i + 1}>{i + 1}</option>)
    }
    return optionMinute;
  }

  handleChangeStartTime(i, event) {
    const value = event.target.value;
    const valueObj = this.state.startTime;
    valueObj[i] = value;
    this.setState({
      startTime: valueObj
    });
  }

  handleChangeEndTime(i, event) {
    const value = event.target.value;
    const valueObj = this.state.endTime;
    valueObj[i] = value;
    this.setState({
      endTime: valueObj
    });
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
    console.log(startTime);
    console.log(endTime);
    console.log(timer);
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
      if (this.state.editOrNew == 0) {
        superagent
          .post('/trains')
          .send(info)
          .use(noCache)
          .end((err, res)=> {
            if (err) {
              throw err;
            }
            if (res.status === 201) {
              this.setState({showSuccess: true}, ()=> {
                this.initInformation();
              });
            } else if (res.status === 204) {
              this.setState({trainIdError: '该列车号已存在'});
            }
          });
      } else {
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

  render() {
    const messageSuccess = this.state.editOrNew == 0 ? `新建` : `修改`;
    const createNew = `/train/new`;
    const list = `/train`;

    return (<div>
      <div className='form-group row no-margin-form'>
        <label className='col-sm-4 control-label'> 列车号 </label>
        <div className='col-sm-6'>
          <input type='text' className='form-control' placeholder='请输入列车号'
                 ref={(ref) => {
                   this.trainId = ref;
                 }} onBlur={this.judgeTrainId.bind(this)} onFocus={this.hiddenErrorMessage.bind(this, 'trainIdError')}/>
        </div>
      </div>
      <ErrorTip error={this.state.trainIdError}/>

      <div className="form-group row no-margin-form">
        <label className='col-sm-4 control-label'> 起点站 </label>
        <div className='col-sm-6'>
          <input type='text' className='form-control' placeholder='请输入起点站'
                 ref={(ref) => {
                   this.startPlace = ref;
                 }} onBlur={this.judgeStartPlace.bind(this)}
                 onFocus={this.hiddenErrorMessage.bind(this, 'startPlaceError')}/>
        </div>
      </div>
      <ErrorTip error={this.state.startPlaceError}/>

      <div className='form-group row no-margin-form'>
        <label className='col-sm-4 control-label'> 发车时间 </label>
        <div onBlur={this.judgeStartTime.bind(this)}
             onFocus={this.hiddenErrorMessage.bind(this, 'startTimeError', 'endTimeError')}>
          <div className='form-group col-sm-2'>
            <select className="form-control province" name="year"
                    value={this.state.startTime.year}
                    onChange={this.handleChangeStartTime.bind(this, 'year')}>
              <option value="-1">请选择</option>
              <option value="2017">2017</option>
            </select>年
          </div>
          <div className="form-group col-sm-2">
            <select className="form-control city" name="month"
                    value={this.state.startTime.month}
                    onChange={this.handleChangeStartTime.bind(this, 'month')}>
              <option value="-1">请选择</option>
              {this.getOptionMonth()}
            </select>月
          </div>
          <div className="form-group col-sm-2">
            <select className="form-control city" name="day"
                    value={this.state.startTime.day}
                    onChange={this.handleChangeStartTime.bind(this, 'day')}>
              <option value="-1">请选择</option>
              {this.getOptionDay()}
            </select>日
          </div>
          <div className="form-group col-sm-offset-4 col-sm-2 no-margin-form">
            <select className="form-control city" name="hour"
                    value={this.state.startTime.hour}
                    onChange={this.handleChangeStartTime.bind(this, 'hour')}>
              <option value="-1">请选择</option>
              {this.getOptionHour()}
            </select>时
          </div>
          <div className="form-group col-sm-2 no-margin-form">
            <select className="form-control city" name="minute"
                    value={this.state.startTime.minute}
                    onChange={this.handleChangeStartTime.bind(this, 'minute')}>
              <option value="-1">请选择</option>
              {this.getOptionMinute()}
            </select>分
          </div>
        </div>
      </div>
      <ErrorTip error={this.state.startTimeError}/>


      <div className="split-border"></div>

      <div className="form-group row no-margin-form">
        <label className='col-sm-4 control-label'> 终点站 </label>
        <div className='col-sm-6'>
          <input type='text' className='form-control' placeholder='请输入终点站'
                 ref={(ref) => {
                   this.endPlace = ref;
                 }} onBlur={this.judgeEndPlace.bind(this)}
                 onFocus={this.hiddenErrorMessage.bind(this, 'endPlaceError')}/>
        </div>
      </div>
      <ErrorTip error={this.state.endPlaceError}/>

      <div className='form-group row no-margin-form'>
        <label className='col-sm-4 control-label'> 到达时间 </label>
        <div onBlur={this.judgeEndTime.bind(this)}
             onFocus={this.hiddenErrorMessage.bind(this, 'endTimeError')}>
          <div className='form-group col-sm-2'>
            <select className="form-control province" name="year"
                    value={this.state.endTime.year}
                    onChange={this.handleChangeEndTime.bind(this, 'year')}>
              <option value="-1">请选择</option>
              <option value="2017">2017</option>
            </select>年
          </div>
          <div className="form-group col-sm-2">
            <select className="form-control city" name="month"
                    value={this.state.endTime.month}
                    onChange={this.handleChangeEndTime.bind(this, 'month')}>
              <option value="-1">请选择</option>
              {this.getOptionMonth()}
            </select>月
          </div>
          <div className="form-group col-sm-2">
            <select className="form-control city" name="day"
                    value={this.state.endTime.day}
                    onChange={this.handleChangeEndTime.bind(this, 'day')}>
              <option value="-1">请选择</option>
              {this.getOptionDay()}
            </select>日
          </div>
          <div className="form-group col-sm-offset-4 col-sm-2 no-margin-form">
            <select className="form-control city" name="hour"
                    value={this.state.endTime.hour}
                    onChange={this.handleChangeEndTime.bind(this, 'hour')}>
              <option value="-1">请选择</option>
              {this.getOptionHour()}
            </select>时
          </div>
          <div className="form-group col-sm-2 no-margin-form">
            <select className="form-control city" name="minute"
                    value={this.state.endTime.minute}
                    onChange={this.handleChangeEndTime.bind(this, 'minute')}>
              <option value="-1">请选择</option>
              {this.getOptionMinute()}
            </select>分
          </div>
        </div>
      </div>
      <ErrorTip error={this.state.endTimeError}/>

      <div className="row margin-top">
        <div className='col-sm-3 width-left text-center'>
          <button className='btn btn-primary btn-save' onClick={this.submit.bind(this)}>
            {'保存  '}
          </button>
        </div>
        <div className='col-sm-3 col-sm-offset-1 text-center'>
          <button className='btn btn-primary btn-save'>{'删除  '}
          </button>
        </div>

        <div className={this.state.showSuccess ? '' : 'hidden'}>
          <div className='alert alert-block alert-success col-sm-6 col-sm-offset-3 no-margin-bottom text-center'>
            <p className='message-hint'>
              <i className='ace-icon fa fa-check-circle icon-space'> </i>
              {`车次${messageSuccess}成功,请选择查看车次列表还是继续新增车次?`}
            </p>
            <Link to={list}>
              <button className='btn btn-sm btn-success icon-space'>查看车次列表
              </button>
            </Link>
            <Link to={createNew}>
              <button className='btn btn-sm btn-default col-sm-offset-2'>{`继续新增车次`}</button>
            </Link>
          </div>
        </div>
      </div>
    </div>);
  }
}