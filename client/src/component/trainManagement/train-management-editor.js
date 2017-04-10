import {Component} from 'react';


const tabsConfiguration = [
  {value: '新增'},
  {value: '修改'}
];

export  default class TrainManagementEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0
    };
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
    return (
      <div className="train-management-editor">
        <div className='tab-ul'>
          <div className='btn-group btn-group-justified tab-padding' role='group'>
            {this.getTabs()}
          </div>
          <div className='train-management-form'>
            <label className='col-sm-4'>列车号</label>
            <div className='col-sm-8'>
              <input type='text' className='form-control'
                     ref={(ref) => {
                       this.trainId = ref;
                     }}/>
            </div>
          </div>

          <div className='train-management-form'>
            <label className='col-sm-4'>始发站</label>
            <div className='col-sm-8'>
              <input type='text' className='form-control'
                     ref={(ref) => {
                       this.startPlace = ref;
                     }}/>
            </div>
          </div>

          <div className='train-management-form'>
            <label className='col-sm-4'>终点站</label>
            <div className='col-sm-8'>
              <input type='text' className='form-control'
                     ref={(ref) => {
                       this.endPlace = ref;
                     }}/>
            </div>
          </div>

          <div className='train-management-form'>
            <label className='col-sm-4'>历时</label>
            <div className='col-sm-8'>
              <input type='text' className='form-control'
                     ref={(ref) => {
                       this.lasted = ref;
                     }}/>
            </div>
          </div>

          <div className='train-management-form'>
            <label className='col-sm-4'>发车时间</label>
            <div className='col-sm-8'>
              <input type='text' className='form-control'
                     ref={(ref) => {
                       this.lasted = ref;
                     }}/>
            </div>
          </div>

          <div className='role-management-form text-center'>
            <button className='btn btn-primary btn-size'> 确定
            </button>
          </div>
        </div>
      </div>
    );
  }
}