import {Component} from 'react';

class ErrorTip extends Component {
  render() {
    return (
      <span className="error-tip">{this.props.error}</span>
    )
  }
}

const tabsConfiguration = [
  {value: '新增'},
  {value: '修改'}
];


export default class SeatEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      trainIdError: '',
      positionError: '',
      priceError: ''
    };
  }

  componentWillReceiveProps() {
    console.log(this.props.currentTicker);
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

  judgeTrainId() {
    if (this.trainId.value == '') {
      this.setState({
        trainIdError: '列车号不能为空'
      });
    }
  }

  judgePosition() {
    if (this.position.value == '') {
      this.setState({
        positionError: '位置不能为空'
      });
    }
  }

  judgePrice() {
    if (this.price.value == '') {
      this.setState({
        priceError: '价格不能为空'
      });
    }
  }

  hiddenErrorMessage(err) {
    var errObj = {};
    errObj[err] = '';
    this.setState(errObj);
  }

  render() {
    return (<div className="seat-form">

      <div className='btn-group btn-group-justified tab-padding' role='group'>
        {this.getTabs()}
      </div>
      <div className=' seat-form'>
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

      <div className=' seat-form'>
        <label className='col-sm-4'>位置</label>
        <div className='col-sm-8 margin-bottom'>
          <input type='text' className='form-control'
                 ref={(ref) => {
                   this.position = ref;
                 }} onBlur={this.judgePosition.bind(this)}
                 onFocus={this.hiddenErrorMessage.bind(this, 'positionError')}/>
          <ErrorTip error={this.state.positionError}/>
        </div>
      </div>

      <div className=' seat-form'>
        <label className='col-sm-4'>价格</label>
        <div className='col-sm-8 margin-bottom'>
          <input type='number' className='form-control'
                 ref={(ref) => {
                   this.price = ref;
                 }} onBlur={this.judgePrice.bind(this)}
                 onFocus={this.hiddenErrorMessage.bind(this, 'priceError')}/>
          <ErrorTip error={this.state.priceError}/>
        </div>
      </div>
    </div>);
  }
}