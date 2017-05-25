import {Component} from 'react';
import {Link, withRouter} from 'react-router';

class ErrorTip extends Component {
  render() {
    return (
      <div className="row margin-err">
        <span className='error-message'>{this.props.error}</span>
      </div>
    );
  }
}

export default class TrainEditorBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trainIdError: ''
    };
  }

  judgeTrainId() {
    if (this.trainId.value == '') {
      this.setState({
        trainIdError: '列车号不能为空'
      });
    }
  }
  hiddenErrorMessage(err) {
    var errObj = {};
    errObj[err] = '';
    this.setState(errObj);
  }

  render() {
    return (<div>
      <div className='form-group row no-margin-form'>
        <label className='col-sm-4 control-label'> 列车号 </label>
        <div className='col-sm-6'>
          <input type='text' className='form-control' placeholder='请输入列车号'
                 ref={(ref) => {
                   this.trainId = ref;
                 }} onBlur={this.judgeTrainId.bind(this)} onFocus={this.hiddenErrorMessage.bind(this, 'trainIdError')}/>
        </div>
      </div>
      <ErrorTip error={this.state.trainIdError}/>

      <div className="form-group row margin-top no-margin-form">
        <label className='col-sm-4 control-label'> 起点站 </label>
        <div className='col-sm-6'>
          <input type='text' className='form-control' placeholder='请输入起点站'
                 ref={(ref) => {
                   this.startPlace = ref;
                 }}/>
        </div>
      </div>

      <div className='form-group row no-margin-form'>
        <label className='col-sm-4 control-label'> 发车时间 </label>
        <div>
          <div className='form-group col-sm-2'>
            <select className="form-control province" name="year">
              <option value="-1">请选择</option>
              <option value="2017">2017</option>
            </select>年
          </div>
          <div className="form-group col-sm-2">
            <select className="form-control city" name="month">
              <option value="-1">请选择</option>
            </select>月
          </div>
          <div className="form-group col-sm-2">
            <select className="form-control city" name="day">
              <option value="-1">请选择</option>
            </select>日
          </div>
          <div className="form-group col-sm-offset-4 col-sm-2 no-margin-form">
            <select className="form-control city" name="hour">
              <option value="-1">请选择</option>
            </select>时
          </div>
          <div className="form-group col-sm-2 no-margin-form">
            <select className="form-control city" name="minute">
              <option value="-1">请选择</option>
            </select>分
          </div>
        </div>
      </div>

      <div className="split-border"></div>

      <div className="form-group row">
        <label className='col-sm-4 control-label'> 终点站 </label>
        <div className='col-sm-6'>
          <input type='text' className='form-control' placeholder='请输入终点站'
                 ref={(ref) => {
                   this.endPlace = ref;
                 }}/>
        </div>
      </div>

      <div className='form-group row no-margin-form'>
        <label className='col-sm-4 control-label'> 到达时间 </label>
        <div>
          <div className='form-group col-sm-2'>
            <select className="form-control province" name="year">
              <option value="-1">请选择</option>
              <option value="2017">2017</option>
            </select>年
          </div>
          <div className="form-group col-sm-2">
            <select className="form-control city" name="month">
              <option value="-1">请选择</option>
            </select>月
          </div>
          <div className="form-group col-sm-2">
            <select className="form-control city" name="day">
              <option value="-1">请选择</option>
            </select>日
          </div>
          <div className="form-group col-sm-offset-4 col-sm-2 no-margin-form">
            <select className="form-control city" name="hour">
              <option value="-1">请选择</option>
            </select>时
          </div>
          <div className="form-group col-sm-2 no-margin-form">
            <select className="form-control city" name="minute">
              <option value="-1">请选择</option>
            </select>分
          </div>
        </div>
      </div>

      <div className="row margin-top">
        <div className='col-sm-3 width-left text-center'>
          <button className='btn btn-primary btn-save'>
            {'保存  '}
          </button>
        </div>
        <div className='col-sm-3 col-sm-offset-1 text-center'>
          <button className='btn btn-primary btn-save'>{'删除  '}
          </button>
        </div>

        <div>
          <div className='alert alert-block alert-success col-sm-6 col-sm-offset-3 no-margin-bottom text-center'>
            <p className='message-hint'>
              <i className='ace-icon fa fa-check-circle icon-space'> </i>
              {`车次成功,请选择查看车次列表还是继续新增车次?`}
            </p>
            <Link>
              <button className='btn btn-sm btn-success icon-space'>查看车次列表
              </button>
            </Link>
            <Link>
              <button className='btn btn-sm btn-default col-sm-offset-2'>{`继续新增车次`}</button>
            </Link>
          </div>
        </div>
      </div>
    </div>);
  }
}