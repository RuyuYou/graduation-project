import {Component} from 'react';
import superagent from 'superagent';
import noCache from 'superagent-no-cache';


const tabsConfiguration = [
  {value: '新增'},
  {value: '修改'}
];

export  default class TickersManagementEditor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0
    }
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
    this.secondSeat.value = '';
    this.specialSeat.value = '';
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
    this.trainId.value = currentTicker.currentTicker.trainId;
    this.firstSeat.value = currentTicker.currentTicker.firstSeat;
    this.secondSeat.value = currentTicker.currentTicker.secondSeat;
    this.specialSeat.value = currentTicker.currentTicker.specialSeat;
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

  submit() {
    const info = {
      trainId: this.trainId.value.trim(),
      firstSeat: this.firstSeat.value.trim(),
      secondSeat: this.secondSeat.value.trim(),
      specialSeat: this.specialSeat.value.trim()
    };
    if (this.state.activeIndex === 1) {
      console.log('put');
    } else {
      superagent.post('/tickers')
        .use(noCache)
        .send(info)
        .end((err, res)=> {
          if (err) {
            throw  err;
          }
          this.props.addTickers();
          this.cleanForm();
        });
    }
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
            <div className='col-sm-8'>
              <input type='text' className='form-control'
                     ref={(ref) => {
                       this.trainId = ref;
                     }}/>
            </div>
          </div>

          <div className='tickers-management-form'>
            <label className='col-sm-4'>一等座</label>
            <div className='col-sm-8'>
              <input type='text' className='form-control'
                     ref={(ref) => {
                       this.firstSeat = ref;
                     }}/>
            </div>
          </div>

          <div className='tickers-management-form'>
            <label className='col-sm-4'>二等座</label>
            <div className='col-sm-8'>
              <input type='text' className='form-control'
                     ref={(ref) => {
                       this.secondSeat = ref;
                     }}/>
            </div>
          </div>

          <div className='tickers-management-form'>
            <label className='col-sm-4'>特等座</label>
            <div className='col-sm-8'>
              <input type='text' className='form-control'
                     ref={(ref) => {
                       this.specialSeat = ref;
                     }}/>
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