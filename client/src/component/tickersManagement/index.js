import {Component} from 'react';
import '../../../style/tickers-manage.less';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import superagent from 'superagent';
import noCache from 'superagent-no-cache';

const header = ['列车号', '列车类型', '起点站', '终点站', '发车时间', '到达时间', '里程', '运行时间', '创建人'];

class ListHeader extends Component {
  render() {
    const title = header.map((item, index)=> {
      return (<th key={index}>{item}</th>)
    });
    return (
      <tr>
        {title}
      </tr>
    )
  }
}


class Tickers extends Component {

  render() {
    return (<div id="ticker">
      <div className='ticker-header'>
        车票管理
      </div>

      <div className="background">
        <div className="ticker-title">
          <span className="fontSize">列车信息查询:</span>
          <div className="split-border"></div>
          <div className="form-group row">
            <label className='col-sm-1 control-label height'> 车次 </label>
            <div className='col-sm-2'>
              <input type='text' className='form-control width height'
                     ref={(ref) => {
                       this.trainId = ref;
                     }}/>
            </div>
            <button className='btn btn-default height'>
              <span className='text'>查询 </span>
            </button>
          </div>

        </div>

        <div>
          <table className="table table-striped table-bordered table-hover">
            <thead>
            <ListHeader/>
            </thead>
            <tbody>
            </tbody>
          </table>

          <div className="row text-center margin">
            <button className="btn btn-primary height">
              添加途经站点
            </button>
          </div>

        </div>
      </div>
    </div>);
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(withRouter(Tickers));