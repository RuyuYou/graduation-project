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
    return (
      <div>
        <div className='btn-group btn-group-justified tab-padding' role='group'>
          {this.getTabs()}
        </div>
      </div>
    )
  }
}