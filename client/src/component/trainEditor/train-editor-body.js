import {Component} from 'react';

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
    </div>);
  }
}