import {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';
import superagent from 'superagent';
import noCache from 'superagent-no-cache';

const middlePlace = [];

class ErrorTip extends Component {
  render() {
    return (
      <div className="row margin-err">
        <span className='error-message'>{this.props.error}</span>
      </div>
    );
  }
}

export default class TrainEditorPlace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      middlePlace: [],
      middlePlaceError: '',
      showMiddlePlace: false,
      activeIndex: -1,
      showDeleteModal: false,
      year: -1,
      month: -1,
      day: -1,
      hour: -1,
      minute: -1,
      trainInformation: {},
      trainIdError: '',
      lastedTimeError: '',
      startTimeError: '',
      startPlaceError: '',
      endPlaceError: '',
      editOrNew: 0,
      showSuccess: false
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
    this.trainId.value = trainInformation.trainId;
    this.lastedHour.value = trainInformation.lastedTime.hour;
    this.lastedMinutes.value = trainInformation.lastedTime.minutes;
    this.startPlace.value = trainInformation.startPlace;
    this.endPlace.value = trainInformation.endPlace;
    const startTime = trainInformation.startTime;
    if (trainInformation.middlePlace.length != 0) {
      this.setState({
        year: startTime.year,
        month: startTime.month,
        day: startTime.day,
        hour: startTime.hour,
        minute: startTime.minutes,
        middlePlace: trainInformation.middlePlace,
        showMiddlePlace: true
      });
    } else {
      this.setState({
        year: startTime.year,
        month: startTime.month,
        day: startTime.day,
        hour: startTime.hour,
        minute: startTime.minutes
      });
    }
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
    if (this.state.month == month) {
      const date = nowDate.getDate();
      for (let i = date + 1; i <= 31; i++) {
        optionDay.push(<option key={i} value={i}>{i}</option>)
      }
    } else if (this.state.month == 6 || this.state.month == 9 || this.state.month == 11) {
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

  handleChangeYear(event) {
    const value = event.target.value;
    this.setState({
      year: value
    });
  }

  handleChangeMonth(event) {
    const value = event.target.value;
    this.setState({
      month: value
    });
  }

  handleChangeDay(event) {
    const value = event.target.value;
    this.setState({
      day: value
    });
  }

  handleChangeHour(event) {
    const value = event.target.value;
    this.setState({
      hour: value
    }, ()=> {
      console.log(this.state.hour);
    });
  }

  handleChangeMinute(event) {
    const value = event.target.value;
    this.setState({
      minute: value
    });
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

  judgeTrainId() {
    if (this.trainId.value == '') {
      this.setState({
        trainIdError: '列车号不能为空'
      });
    }
  }

  judgeLastedTime() {
    if (this.lastedMinutes.value == '') {
      this.setState({
        lastedTimeError: '时长不能为空'
      });
    } else if (this.lastedHour.value < 0 || this.lastedMinutes.value < 1) {
      this.setState({lastedTimeError: '时长不能为负数'});
    }
  }

  judgeStartTime() {
    if (this.state.year == -1 || this.state.month == -1 || this.state.day == -1 || this.state.hour == -1 || this.state.minute == -1) {
      this.setState({startTimeError: '发车时间不能为空'})
    }
  }

  judgeStartPlace() {
    if (this.startPlace.value == '') {
      this.setState({startPlaceError: '始发站不能为空'});
    }
  }

  judgeEndPlace() {
    if (this.endPlace.value == '') {
      this.setState({endPlaceError: '终点站不能为空'});
    }
  }

  hiddenErrorMessage(err) {
    var errObj = {};
    errObj[err] = '';
    this.setState(errObj);
  }

  submit() {
    const info = {
      trainId: this.trainId.value,
      startPlace: this.startPlace.value,
      endPlace: this.endPlace.value,
      middlePlace: this.state.middlePlace,
      lastedTime: {
        hour: this.lastedHour.value,
        minutes: this.lastedMinutes.value
      },
      startTime: {
        year: this.state.year,
        month: this.state.month,
        day: this.state.day,
        hour: this.state.hour,
        minutes: this.state.minute
      }
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
            this.setState({showSuccess: true});
          } else if (res.status === 204) {
            this.setState({trainIdError: '该列车号已存在'});
          }
        });
    } else {
      const pathNameArray = window.location.pathname.split('/');
      superagent
        .put(`/trains/${pathNameArray[2]}`)
        .send(info)
        .use(noCache)
        .end((err, res)=> {
          if (err) {
            throw err;
          }
          if (res.status === 204) {
            this.setState({showSuccess: true});
          }
        })
    }
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
    const messageSuccess = this.state.editOrNew == 0 ? `新建` : `修改`;
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

      <div className='form-group row  no-margin-form'>
        <label className='col-sm-4 control-label'> 总时长 </label>
        <div className='col-sm-6' onBlur={this.judgeLastedTime.bind(this)}
             onFocus={this.hiddenErrorMessage.bind(this, 'lastedTimeError')}>
          <div className='col-sm-4 no-padding form-group  no-margin-form'>
            <input type="number" className="level-input form-control"
                   ref={(ref)=> {
                     this.lastedHour = ref;
                   }}/>
            <label>小时</label>
          </div>

          <div className='col-sm-4 no-padding form-group  no-margin-form'>
            <input type="number" className="level-input form-control"
                   ref={(ref)=> {
                     this.lastedMinutes = ref;
                   }}/>
            <label>分钟</label>
          </div>
        </div>
      </div>
      <ErrorTip error={this.state.lastedTimeError}/>


      <div className='form-group row no-margin-form'>
        <label className='col-sm-4 control-label'> 发车时间 </label>
        <div onBlur={this.judgeStartTime.bind(this)}
             onFocus={this.hiddenErrorMessage.bind(this, 'startTimeError')}>
          <div className='form-group col-sm-2'>
            <select className="form-control province" name="year"
                    value={this.state.year}
                    onChange={this.handleChangeYear.bind(this)}>
              <option value="-1">请选择</option>
              <option value="2017">2017</option>
            </select>年
          </div>
          <div className="form-group col-sm-2">
            <select className="form-control city" name="month"
                    value={this.state.month}
                    onChange={this.handleChangeMonth.bind(this)}>
              <option value="-1">请选择</option>
              {this.getOptionMonth()}
            </select>月
          </div>
          <div className="form-group col-sm-2">
            <select className="form-control city" name="day"
                    value={this.state.day}
                    onChange={this.handleChangeDay.bind(this)}>
              <option value="-1">请选择</option>
              {this.getOptionDay()}
            </select>日
          </div>
          <div className="form-group col-sm-offset-4 col-sm-2 no-margin-form">
            <select className="form-control city" name="hour"
                    value={this.state.hour}
                    onChange={this.handleChangeHour.bind(this)}>
              <option value="-1">请选择</option>
              {this.getOptionHour()}
            </select>时
          </div>
          <div className="form-group col-sm-2 no-margin-form">
            <select className="form-control city" name="minute"
                    value={this.state.minute}
                    onChange={this.handleChangeMinute.bind(this)}>
              <option value="-1">请选择</option>
              {this.getOptionMinute()}
            </select>分
          </div>
        </div>
      </div>
      <ErrorTip error={this.state.startTimeError}/>


      <div className="split-border"></div>

      <div className="form-group row margin-top no-margin-form">
        <label className='col-sm-4 control-label'> 始发站 </label>
        <div className='col-sm-6'>
          <input type='text' className='form-control' placeholder='请输入始发站'
                 ref={(ref) => {
                   this.startPlace = ref;
                 }} onBlur={this.judgeStartPlace.bind(this)}
                 onFocus={this.hiddenErrorMessage.bind(this, 'startPlaceError')}/>
        </div>
      </div>
      <ErrorTip error={this.state.startPlaceError}/>

      <div className="form-group row">
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

      <div className="row">
        <label className={this.state.showMiddlePlace ? 'col-sm-4 control-label' : 'col-sm-4 control-label  hidden'}>
          中间站 </label>
        {middlePlaceHTML}
      </div>

      <div className="btn-left margin-top">
        <button className="btn btn-primary btn-save"
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

      <div className="row margin-top">
        <div className='col-sm-3 width-left text-center'>
          <button className='btn btn-primary btn-save'
                  onClick={this.submit.bind(this)}>
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
            <button className='btn btn-sm btn-success icon-space'>查看试卷列表
            </button>
            <button className='btn btn-sm btn-default col-sm-offset-2'
            >{`继续新增车次`}</button>
          </div>
        </div>

      </div>
    </div>);
  }
}