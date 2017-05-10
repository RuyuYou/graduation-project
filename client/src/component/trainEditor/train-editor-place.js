import {Component} from 'react';

export default class TrainEditorPlace extends Component {
  render() {
    return (<div>
      <div className="form-group row margin-top">
        <label className='col-sm-4 control-label'> 始发站 </label>
        <div className='col-sm-6'>
          <input type='text' className='form-control' placeholder='请输入始发站'
                 ref={(ref) => {
                   this.startPlace = ref;
                 }}/>
        </div>
      </div>

      <div className="form-group row margin-top">
        <label className='col-sm-4 control-label'> 终点站 </label>
        <div className='col-sm-6'>
          <input type='text' className='form-control' placeholder='请输入终点站'
                 ref={(ref) => {
                   this.endPlace = ref;
                 }}/>
        </div>
      </div>

      <div className="text-center margin-top">
        <button className="btn btn-primary">点击添加中间站</button>
      </div>
    </div>);
  }
}