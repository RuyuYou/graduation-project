import {Component} from 'react';
import {Link, withRouter} from 'react-router';

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
      endPlaceError: ''
    };
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

  hiddenErrorMessage(err) {
    var errObj = {};
    errObj[err] = '';
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

  render() {

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
             onFocus={this.hiddenErrorMessage.bind(this, 'startTimeError')}>
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
        <div>
          <div className='form-group col-sm-2'>
            <select className="form-control province" name="year">
              <option value="-1">请选择</option>
              <option value="2017">2017</option>
            </select>年
          </div>
          <div className="form-group col-sm-2">
            <select className="form-control city" name="month">
              <option value="-1">请选择</option>
            </select>月
          </div>
          <div className="form-group col-sm-2">
            <select className="form-control city" name="day">
              <option value="-1">请选择</option>
            </select>日
          </div>
          <div className="form-group col-sm-offset-4 col-sm-2 no-margin-form">
            <select className="form-control city" name="hour">
              <option value="-1">请选择</option>
            </select>时
          </div>
          <div className="form-group col-sm-2 no-margin-form">
            <select className="form-control city" name="minute">
              <option value="-1">请选择</option>
            </select>分
          </div>
        </div>
      </div>

      <div className="row margin-top">
        <div className='col-sm-3 width-left text-center'>
          <button className='btn btn-primary btn-save'>
            {'保存  '}
          </button>
        </div>
        <div className='col-sm-3 col-sm-offset-1 text-center'>
          <button className='btn btn-primary btn-save'>{'删除  '}
          </button>
        </div>

        <div>
          <div className='alert alert-block alert-success col-sm-6 col-sm-offset-3 no-margin-bottom text-center'>
            <p className='message-hint'>
              <i className='ace-icon fa fa-check-circle icon-space'> </i>
              {`车次成功,请选择查看车次列表还是继续新增车次?`}
            </p>
            <Link>
              <button className='btn btn-sm btn-success icon-space'>查看车次列表
              </button>
            </Link>
            <Link>
              <button className='btn btn-sm btn-default col-sm-offset-2'>{`继续新增车次`}</button>
            </Link>
          </div>
        </div>
      </div>
    </div>);
  }
}