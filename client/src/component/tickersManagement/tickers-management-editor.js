import {Component} from 'react';
import superagent from 'superagent';
import noCache from 'superagent-no-cache';

const tabsConfiguration = [
  {value: '新增'},
  {value: '修改'}
];

class ErrorTip extends Component {
  render() {
    return (
      <span className="error-tip">{this.props.error}</span>
    )
  }
}

export  default class TickersManagementEditor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      trainIdError: '',
      cabinError: '',
      sleeperError: '',
      seatError: ''
    };
  }

  handleTabsToggle(index) {
    if (index === 0) {
      this.cleanForm();
      this.setState({
        updateFormEnable: false,
        activeIndex: index
      });
    }
  }

  cleanForm() {
    this.trainId.value = '';
    this.firstSeat.value = '';
    this.firstPrice.value = '';
    this.secondSeat.value = '';
    this.secondPrice.value = '';
    this.specialSeat.value = '';
    this.specialPrice.value = '';
  }

  getTabs() {
    return tabsConfiguration.map((tab, index) => {
      let active = this.state.activeIndex === index ? 'btn-primary' : 'btn-default';
      return (
        <div className='btn-group' role='group' key={index}>
          <button type='button' className={'btn ' + active}
                  disabled={index === 1 && !this.state.updateFormEnable ? 'disabled' : ''}
                  onClick={this.handleTabsToggle.bind(this, index)}>
            {tab.value}
          </button>
        </div>
      );
    });
  }

  receivePropsData(currentTicker) {
    const item = currentTicker.currentTicker;
    this.trainId.value = item.trainId;
    this.cabin.value = item.cabinNumber;
    this.sleeper.value = item.sleeperNumber;
    this.seat.value = item.seatNumber;
  }

  componentWillReceiveProps(next) {
    if (next.currentTicker.trainId) {
      this.receivePropsData(next);
      this.setState({
        activeIndex: 1,
        updateFormEnable: true
      });
    }
  }

  judgeTrainId() {
    if (this.trainId.value == '') {
      this.setState({
        trainIdError: '列车号不能为空'
      });
    }
  }

  judgeCabin() {
    if (this.cabin.value == '') {
      this.setState({
        cabinError: '车厢个数不能为空'
      });
    }
  }

  judgeSleeper() {
    if (this.sleeper.value == '') {
      this.setState({
        sleeperError: '卧铺个数不能为空'
      });
    }
  }

  judgeSeat() {
    if (this.seat.value == '') {
      this.setState({
        seatError: '硬座个数不能为空'
      });
    }
  }

  submit() {
    const info = {
      trainId: this.trainId.value.trim(),
      firstInformation: {
        firstSeat: this.firstSeat.value.trim(),
        firstPrice: this.firstPrice.value.trim()
      },
      secondInformation: {
        secondSeat: this.secondSeat.value.trim(),
        secondPrice: this.secondPrice.value.trim()
      },
      specialInformation: {
        specialSeat: this.specialSeat.value.trim(),
        specialPrice: this.specialPrice.value.trim()
      }
    };
    if (this.state.activeIndex === 1) {
      const id = this.props.currentTicker._id;
      superagent.put(`/tickers/${id}`)
        .use(noCache)
        .send(info)
        .end((err, res)=> {
          if (err) {
            throw err;
          }
          if (res.status === 204) {
            this.setState({trainIdError: '该列车已存储过票务信息'});
          } else if (res.status === 202) {
            this.setState({trainIdError: '不存在该列车,请先创建'});
          } else {
            this.props.modifyTickers();
            this.cleanForm();
          }
        })
    } else {
      superagent.post('/tickers')
        .use(noCache)
        .send(info)
        .end((err, res)=> {
          if (err) {
            throw  err;
          }
          if (res.status === 204) {
            this.setState({trainIdError: '该列车已存储过票务信息'});
          } else if (res.status === 202) {
            this.setState({trainIdError: '不存在该列车,请先创建'});
          } else {
            this.props.modifyTickers();
            this.cleanForm();
          }
        });
    }
  }

  hiddenErrorMessage(err) {
    var errObj = {};
    errObj[err] = '';
    this.setState(errObj);
  }

  render() {
    return (
      <div className="tickers-management-editor">
        <div className='tab-ul'>
          <div className='btn-group btn-group-justified tab-padding' role='group'>
            {this.getTabs()}
          </div>

          <div className='tickers-management-form'>
            <label className='col-sm-4'>列车号</label>
            <div className='col-sm-8 margin-bottom'>
              <input type='text' className='form-control'
                     ref={(ref) => {
                       this.trainId = ref;
                     }} onBlur={this.judgeTrainId.bind(this)}
                     onFocus={this.hiddenErrorMessage.bind(this, 'trainIdError')}/>
              <ErrorTip error={this.state.trainIdError}/>
            </div>
          </div>

          <div className='tickers-management-form'>
            <label className='col-sm-4'>车厢个数</label>
            <div className='col-sm-8 margin-bottom'>
              <input type='number' className='form-control'
                     ref={(ref) => {
                       this.cabin = ref;
                     }} onBlur={this.judgeCabin.bind(this)}
                     onFocus={this.hiddenErrorMessage.bind(this, 'cabinError')}/>
              <ErrorTip error={this.state.cabinError}/>
            </div>
          </div>

          <div className='tickers-management-form'>
            <label className='col-sm-4'>卧铺个数</label>
            <div className='col-sm-8 margin-bottom'>
              <input type='number' className='form-control'
                     ref={(ref) => {
                       this.sleeper = ref;
                     }} onBlur={this.judgeSleeper.bind(this)}
                     onFocus={this.hiddenErrorMessage.bind(this, 'sleeperError')}/>
              <ErrorTip error={this.state.sleeperError}/>
            </div>
          </div>

          <div className='tickers-management-form'>
            <label className='col-sm-4'>硬座个数</label>
            <div className='col-sm-8 margin-bottom'>
              <input type='number' className='form-control'
                     ref={(ref) => {
                       this.seat = ref;
                     }} onBlur={this.judgeSeat.bind(this)}
                     onFocus={this.hiddenErrorMessage.bind(this, 'seatError')}/>
              <ErrorTip error={this.state.seatError}/>
            </div>
          </div>

          <div className='role-management-form text-center'>
            <button className='btn btn-primary btn-size'
                    onClick={this.submit.bind(this)}>
              确定
            </button>
          </div>
        </div>
      </div>
    );
  }
}