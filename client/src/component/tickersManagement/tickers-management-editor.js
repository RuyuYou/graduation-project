import {Component} from 'react';


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

  getTabs() {
    return tabsConfiguration.map((tab, index) => {
      let active = this.state.activeIndex === index ? 'btn-primary' : 'btn-default';
      return (
        <div className='btn-group' role='group' key={index}>
          <button type='button' className={'btn ' + active}>{tab.value}</button>
        </div>
      );
    });
  }

  render() {
    const monthOption = [];
    for (let i = 1; i <= 12; i++) {
      monthOption.push(<option value={i}>{i}</option>);
    }
    const dateOption = [];
    for (let j = 1; j<= 31; j++) {
      dateOption.push(<option value={j}>{j}</option>)
    }
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
                       this.userName = ref;
                     }}/>
            </div>
          </div>

          <div className='tickers-management-form'>
            <label className='col-sm-4'>始发地</label>
            <div className='col-sm-8'>
              <input type='text' className='form-control'
                     ref={(ref) => {
                       this.userName = ref;
                     }}/>
            </div>
          </div>

          <div className='tickers-management-form'>
            <label className='col-sm-4'>到达地</label>
            <div className='col-sm-8'>
              <input type='text' className='form-control'
                     ref={(ref) => {
                       this.userName = ref;
                     }}/>
            </div>
          </div>

          <div className='tickers-management-form'>
            <label className='col-sm-4'>历时</label>
            <div className='col-sm-8'>
              <input type='text' className='form-control'
                     ref={(ref) => {
                       this.userName = ref;
                     }}/>
            </div>
          </div>

          <div className='tickers-management-form'>
            <label className='col-sm-4'>硬座</label>
            <div className='col-sm-8'>
              <input type='text' className='form-control'
                     ref={(ref) => {
                       this.userName = ref;
                     }}/>
            </div>
          </div>

          <div className='tickers-management-form'>
            <label className='col-sm-4'>软座</label>
            <div className='col-sm-8'>
              <input type='text' className='form-control'
                     ref={(ref) => {
                       this.userName = ref;
                     }}/>
            </div>
          </div>

          <div className='tickers-management-form'>
            <label className='col-sm-4'>发车时间</label>
            <div className='col-sm-8'>
              <div className="form-group">
                <select id="year">
                  <option value=''>2017</option>
                </select>
                <select id="month">
                  {monthOption}
                </select>
                <select id="date">
                  {dateOption}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}