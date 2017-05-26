import {Component} from 'react';
import '../../../style/station.less';

export default class StationEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ''
    };
  }

  componentDidMount() {
    const pathNameArray = window.location.pathname.split('/');
    if (pathNameArray[pathNameArray.length - 1] === 'edit') {
      this.setState({
        title: '修改',
      });
    } else {
      this.setState({
        title: '新增'
      });
    }
  }

  render() {
    return (<div id="station">
      <div className='station-header'>
        {`${this.state.title}站点`}
      </div>
      <div className='station-title'>

      </div>
    </div>);
  }
}