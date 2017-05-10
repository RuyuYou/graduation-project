import {Component} from 'react';

export default class TrainEditorStartTime extends Component {

  constructor(props) {
    super(props);
    this.state = {
      year: 0,
      month: 0,
      day: 0
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

  /*5:31,6:30,7:31,8:31,9:30,10:31,11:30,12:31*/

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

  render() {
    return (<div>
      <div className='form-group row'>
        <label className='col-sm-4 control-label'> 发车时间 </label>
        <div className="'col-sm-6">
          <div className='form-group col-sm-2'>
            <select className="form-control province" name="year"
                    value={this.state.year}
                    onChange={this.handleChangeYear.bind(this)}>
              <option value="year">请选择</option>
              <option value="2017">2017</option>
            </select>年
          </div>
          <div className="form-group col-sm-2">
            <select className="form-control city" name="month"
                    value={this.state.month}
                    onChange={this.handleChangeMonth.bind(this)}>
              <option value="">请选择</option>
              {this.getOptionMonth()}
            </select>月
          </div>
          <div className="form-group col-sm-2">
            <select className="form-control city" name="day">
              <option value="">请选择</option>
              {this.getOptionDay()}
            </select>日
          </div>
        </div>
      </div>
    </div>);
  }
}