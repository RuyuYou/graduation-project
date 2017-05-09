import {Component} from 'react';

const labels = [
  {
    text: '小时',

  }
]

export default class TrainEditorBody extends Component {
  render() {
    return (<div className="train-editor-body">
      <div className='form-group row'>
        <label className='col-sm-4 control-label'> 列车号 </label>
        <div className='col-sm-6'>
          <input type='text' className='form-control' placeholder='请输入列车号'
                 ref={(ref) => {
                   this.trainId = ref;
                 }}/>
        </div>
      </div>

      <div className='form-group row'>
        <label className='col-sm-4 control-label'> 总时长 </label>
        <div className='col-sm-6'>
          <div className='col-sm-3 no-padding form-group'>
            <input type="number" className="level-input form-control"
                   ref={(ref)=> {
                     this.hours = ref;
                   }}/>
            <label>小时</label>
          </div>

          <div className='col-sm-3 no-padding form-group'>
            <input type="number" className="level-input form-control"
                   ref={(ref)=> {
                     this.minutes = ref;
                   }}/>
            <label>分钟</label>
          </div>
        </div>
      </div>
    </div>);
  }
}