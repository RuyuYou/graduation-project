import {Component} from 'react';

export default class TrainEditorStartTime extends Component {

  constructor(props) {
    super(props);
    this.state = {
      month: 0,
      day: 0
    }
  }

  getOptionMonth() {
    const nowDate = new Date();
    const month = nowDate.getMonth();
    const optionMonth = [];
    console.log(month);
    for (let i = month; i < 12; i++) {
      optionMonth.push(<option key={i} value={i + 1}>{i + 1}</option>)
    }
    return optionMonth;
  }

  optionDay() {

  }

  render() {
    return (<div>
      <div className='form-group row'>
        <label className='col-sm-4 control-label'> 发车时间 </label>
        <div className="'col-sm-6">
          <div className='form-group col-sm-2'>
            <select className="form-control province" name="schoolProvince">
              <option value="">请选择</option>
              <option value="year">2017</option>
            </select>年
          </div>
          <div className="form-group col-sm-2">
            <select className="form-control city" name="schoolCity">
              <option value="">请选择</option>
              {this.getOptionMonth()}
            </select>月
          </div>
          <div className="form-group col-sm-2">
            <select className="form-control city" name="schoolCity">
              <option value="">请选择</option>
            </select>日
          </div>
        </div>
      </div>
      <div className="train-editor-body ">

      </div>
    </div>);
  }
}