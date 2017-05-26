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
      activeIndex: 0
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
                 }}/>
          <ErrorTip />
        </div>
      </div>
    </div>);
  }
}