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
          this.props.modifyTickers();
          this.cleanForm();
        })
    } else {
      superagent.post('/tickers')
        .use(noCache)
        .send(info)
        .end((err, res)=> {
          if (err) {
            throw  err;
          }
          this.props.modifyTickers();
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
            <div className='col-sm-8 form-line'>
              <div className="form-group col-sm-6 no-padding-left">
                <input type='text' className='form-control'
                       placeholder="个数"
                       ref={(ref) => {
                         this.firstSeat = ref;
                       }}/>
              </div>
              <div className="form-group col-sm-6 no-padding-right">
                <input type='text' className='form-control'
                       placeholder="价格"
                       ref={(ref) => {
                         this.firstPrice = ref;
                       }}/>
              </div>
            </div>
          </div>

          <div className='tickers-management-form'>
            <label className='col-sm-4'>二等座</label>
            <div className='col-sm-8 form-line'>
              <div className="form-group col-sm-6 no-padding-left">
                <input type='text' className='form-control'
                       placeholder="个数"
                       ref={(ref) => {
                         this.secondSeat = ref;
                       }}/>
              </div>
              <div className="form-group col-sm-6 no-padding-right">
                <input type='text' className='form-control'
                       placeholder="价格"
                       ref={(ref) => {
                         this.secondPrice = ref;
                       }}/>
              </div>
            </div>
          </div>

          <div className='tickers-management-form'>
            <label className='col-sm-4'>特等座</label>
            <div className='col-sm-8 form-line'>
              <div className="form-group col-sm-6 no-padding-left">
                <input type='text' className='form-control'
                       placeholder="个数"
                       ref={(ref) => {
                         this.specialSeat = ref;
                       }}/>
              </div>
              <div className="form-group col-sm-6 no-padding-right">
                <input type='text' className='form-control'
                       placeholder="价格"
                       ref={(ref) => {
                         this.specialPrice = ref;
                       }}/>
              </div>
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