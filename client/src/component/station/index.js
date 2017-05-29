import {Component} from 'react';
import '../../../style/station.less';
import StationList from './stationList';
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


class Station extends Component {

  constructor(props) {
    super(props);
    this.state = {
      trainInformation: [],
      showTable: false
    };
  }

  addStation() {
    const pathName = window.location.pathname;
    this.props.router.push(pathName + '/new');
  }

  findTrain() {
    superagent
      .get(`/trains/${this.trainId.value}`)
      .use(noCache)
      .end((err, res)=> {
        if (err) {
          throw err;
        }
        if (res.status === 204) {
          alert('该车次不存在请从新输入');
        } else {
          const array = [];
          array.push(res.body);
          this.setState({
            trainInformation: array,
            showTable: true
          }, ()=> {
            this.trainId.value = '';
          });
        }
      })
  }

  judgeDays(days) {
    if (days == 0) {
      return '当天';
    } else {
      return `+${days}天`;
    }
  }

  render() {
    const trainInformation = this.state.trainInformation || [];
    const listHTML = trainInformation.map((item, index)=> {
      const updatePath = window.location.pathname + `/${item.trainId}/edit`;
      const startTime = `${item.startTime.hour}时${item.startTime.minute}分`;
      const endTime = `${item.endTime.hour}时${item.endTime.minute}分`;
      const lastedTime = `${item.lastedTime.hour}时${item.lastedTime.minute}分钟`;
      return (
        <tr key={index}>
          <td>{item.trainId}</td>
          <td>{item.type}</td>
          <td>{item.startPlace}</td>
          <td>{item.endPlace}</td>
          <td>{startTime}</td>
          <td>
            {endTime}
            <label className="redDays">{this.judgeDays(item.endTime.days)}</label>
          </td>
          <td>{item.mile}</td>
          <td>{lastedTime}</td>
          <td>{item.createPeople}</td>
        </tr>
      );
    });
    return (<div id="station">
      <div className='station-header'>
        站点管理
      </div>

      <div className="background">
        <div className="station-title">
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
            <button className='btn btn-default height'
                    onClick={this.findTrain.bind(this)}>
              <span className='text'>查询 </span>
            </button>
          </div>

        </div>

        <div className={this.state.showTable ? '' : 'hidden'}>
          <table className="table table-striped table-bordered table-hover">
            <thead>
            <ListHeader/>
            </thead>
            <tbody>
            {listHTML}
            </tbody>
          </table>
        </div>

        <div className="row text-center margin">
          <button className="btn btn-primary height">
            添加途经站点
          </button>
        </div>

        <StationList/>
      </div>
    </div>);
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(withRouter(Station));