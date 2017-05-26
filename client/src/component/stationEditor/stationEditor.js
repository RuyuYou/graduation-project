import {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';
import {Link} from 'react-router';


const stationPlace = [];

const header = ['中间站点', '到达时间', '离开时间', '操作'];

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

export default class StationEditor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showAddModal: false,
      stationPlaceError: '',
      stationPlace: [],
      arriveTime: {
        year: -1,
        month: -1,
        day: -1,
        hour: -1,
        minute: -1
      },
      leaveTime: {
        year: -1,
        month: -1,
        day: -1,
        hour: -1,
        minute: -1
      },
      activeIndex: -1,
      leaveTimeError: '',
      showStationPlace: false
    };
  }

  addStationPlace() {
    this.setState({
      showAddModal: true
    });
  }

  cancelButton() {
    this.setState({
      showAddModal: false,
      stationPlaceError: ''
    }, ()=> {
      this.station.value = '';
    });
  }

  makeSureAdd() {
    let arriveTime = this.state.arriveTime.month * 100000 + this.state.arriveTime.day * 1000
      + this.state.arriveTime.hour * 10 + this.state.arriveTime.minute;
    let leaveTime = this.state.leaveTime.month * 100000 + this.state.leaveTime.day * 1000
      + this.state.leaveTime.hour * 10 + this.state.leaveTime.minute;
    const timer = leaveTime - arriveTime;
    if (timer <= 0) {
      this.setState({
        leaveTimeError: '离开时间不能低于到达时间'
      });
    }
    if (this.state.activeIndex === -1) {
      if (this.station.value != '') {
        const value = {
          station: this.station.value,
          leaveTime: this.state.leaveTime,
          arriveTime: this.state.arriveTime
        };
        stationPlace.push(value);
        this.setState({
          showAddModal: false,
          stationPlace: stationPlace,
          showStationPlace: true,
          arriveTime: {
            year: -1,
            month: -1,
            day: -1,
            hour: -1,
            minute: -1
          },
          leaveTime: {
            year: -1,
            month: -1,
            day: -1,
            hour: -1,
            minute: -1
          }
        }, ()=> {
          this.station.value = '';
        });
      } else {
        this.setState({
          stationPlaceError: '中间站不能为空'
        });
      }
    } else {
      if (this.station.value != '') {
        const value = {
          station: this.station.value,
          leaveTime: this.state.leaveTime,
          arriveTime: this.state.arriveTime
        };
        stationPlace.splice(this.state.activeIndex, 1, value);
        this.setState({
          showAddModal: false,
          stationPlace: stationPlace,
          showStationPlace: true,
          activeIndex: -1,
          arriveTime: {
            year: -1,
            month: -1,
            day: -1,
            hour: -1,
            minute: -1
          },
          leaveTime: {
            year: -1,
            month: -1,
            day: -1,
            hour: -1,
            minute: -1
          }
        }, ()=> {
          this.station.value = '';
        });
      } else {
        this.setState({
          stationPlaceError: '中间站点不能为空'
        });
      }
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
    if (this.state.arriveTime.month == month) {
      const date = nowDate.getDate();
      for (let i = date + 1; i <= 31; i++) {
        optionDay.push(<option key={i} value={i}>{i}</option>)
      }
    } else if (this.state.arriveTime.month == 6 || this.state.arriveTime.month == 9 || this.state.arriveTime.month == 11) {
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

  handleChangeArriveTime(i, event) {
    const value = event.target.value;
    const valueObj = this.state.arriveTime;
    valueObj[i] = value;
    this.setState({
      arriveTime: valueObj
    });
  }

  handleChangeLeaveTime(i, event) {
    const value = event.target.value;
    const valueObj = this.state.leaveTime;
    valueObj[i] = value;
    this.setState({
      leaveTime: valueObj
    });
  }

  render() {

    const stationPlaceHTML = stationPlace.map((item, index)=> {
      const leaveTime = `${item.leaveTime.year}年${item.leaveTime.month}月${item.leaveTime.day}日
${item.leaveTime.hour}时${item.leaveTime.minute}分`;
      const arriveTime = `${item.arriveTime.year}年${item.arriveTime.month}月${item.arriveTime.day}日
${item.arriveTime.hour}时${item.arriveTime.minute}分`;
      return (
        <tr key={index}>
          <td><input type="checkbox"/></td>
          <td>{item.station}</td>
          <td>{arriveTime}</td>
          <td>{leaveTime}</td>
          <td>
            <Link>修改站点</Link>
            <Link>删除站点</Link>
          </td>
        </tr>
      )
    });

    return (<div>
      <div className='form-group row no-margin-form'>
        <label className='col-sm-2 control-label'> 列车号 </label>
        <div className='col-sm-4'>
          <input type='text' className='form-control' placeholder='请输入列车号'
                 ref={(ref) => {
                   this.trainId = ref;
                 }}/>
        </div>
      </div>

      <div className={this.state.showStationPlace ? '' : 'hidden'}>
        <table className="table table-striped table-bordered table-hover">
          <thead>
          <ListHeader />
          </thead>
          <tbody>
          {stationPlaceHTML}
          </tbody>
        </table>
      </div>

      <div className="btn-center margin-top">

      </div>

      <div className="row margin-top">
        <div className=' col-sm-3 width-left text-center'>
          <button className="btn btn-primary btn-save"
                  onClick={this.addStationPlace.bind(this)}>
            点击添加中间站点
          </button>
        </div>
        <div className='col-sm-3 col-sm-offset-1 text-center'>
          <button className='btn btn-primary btn-save'>
            {'保存  '}
          </button>
        </div>

      </div>

      <div className={this.state.showAddModal ? '' : 'hidden'}>
        <div className='static-modal'>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>添加中间站</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <div className="form-group margin-modal no-margin-bottom">
                <input type="text" className="form-control" placeholder="请输入中间点站"
                       ref={(ref)=> {
                         this.station = ref;
                       }} onFocus={this.hiddenErrorMessage.bind(this, 'stationPlaceError')}/>
                <span className="error-tip1">{this.state.stationPlaceError}</span>
              </div>

              <div onFocus={this.hiddenErrorMessage.bind(this, 'leaveTimeError')}>
                <div className='form-group row no-margin-form'>
                  <label className='col-xs-2 control-label'> 到达时间 </label>
                  <div>
                    <div className='form-group col-xs-3'>
                      <select className="form-control city" name="year"
                              value={this.state.arriveTime.year}
                              onChange={this.handleChangeArriveTime.bind(this, 'year')}>
                        <option value="-1">请选择</option>
                        <option value="2017">2017</option>
                      </select>年
                    </div>
                    <div className="form-group col-xs-3">
                      <select className="form-control city" name="month"
                              value={this.state.arriveTime.month}
                              onChange={this.handleChangeArriveTime.bind(this, 'month')}>
                        <option value="-1">请选择</option>
                        {this.getOptionMonth()}
                      </select>月
                    </div>
                    <div className="form-group col-xs-3">
                      <select className="form-control city" name="day"
                              value={this.state.arriveTime.day}
                              onChange={this.handleChangeArriveTime.bind(this, 'day')}>
                        <option value="-1">请选择</option>
                        {this.getOptionDay()}
                      </select>日
                    </div>
                    <div className="form-group col-xs-offset-2 col-xs-3">
                      <select className="form-control city" name="hour"
                              value={this.state.arriveTime.hour}
                              onChange={this.handleChangeArriveTime.bind(this, 'hour')}>
                        <option value="-1">请选择</option>
                        {this.getOptionHour()}
                      </select>时
                    </div>
                    <div className="form-group col-xs-3">
                      <select className="form-control city" name="minute"
                              value={this.state.arriveTime.minute}
                              onChange={this.handleChangeArriveTime.bind(this, 'minute')}>
                        <option value="-1">请选择</option>
                        {this.getOptionMinute()}
                      </select>分
                    </div>
                  </div>
                </div>
                <div className='form-group row no-margin-form'>
                  <label className='col-xs-2 control-label'> 离开时间 </label>
                  <div>
                    <div className='form-group col-xs-3'>
                      <select className="form-control city" name="year"
                              value={this.state.leaveTime.year}
                              onChange={this.handleChangeLeaveTime.bind(this, 'year')}>
                        <option value="-1">请选择</option>
                        <option value="2017">2017</option>
                      </select>年
                    </div>
                    <div className="form-group col-xs-3">
                      <select className="form-control city" name="month"
                              value={this.state.leaveTime.month}
                              onChange={this.handleChangeLeaveTime.bind(this, 'month')}>
                        <option value="-1">请选择</option>
                        {this.getOptionMonth()}
                      </select>月
                    </div>
                    <div className="form-group col-xs-3">
                      <select className="form-control city" name="day"
                              value={this.state.leaveTime.day}
                              onChange={this.handleChangeLeaveTime.bind(this, 'day')}>
                        <option value="-1">请选择</option>
                        {this.getOptionDay()}
                      </select>日
                    </div>
                    <div className="form-group col-xs-offset-2 col-xs-3 no-margin-form">
                      <select className="form-control city" name="hour"
                              value={this.state.leaveTime.hour}
                              onChange={this.handleChangeLeaveTime.bind(this, 'hour')}>
                        <option value="-1">请选择</option>
                        {this.getOptionHour()}
                      </select>时
                    </div>
                    <div className="form-group col-xs-3 no-margin-form">
                      <select className="form-control city" name="minute"
                              value={this.state.leaveTime.minute}
                              onChange={this.handleChangeLeaveTime.bind(this, 'minute')}>
                        <option value="-1">请选择</option>
                        {this.getOptionMinute()}
                      </select>分
                    </div>
                  </div>
                </div>
              </div>
              <span className="col-xs-offset-2 error-tip2 text-center">{this.state.leaveTimeError}</span>


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