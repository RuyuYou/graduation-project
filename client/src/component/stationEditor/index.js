import {Component} from 'react';
import '../../../style/stationEditor.less';
import StationEditorBody from './stationEditor';


export default class StationEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ''
    };
  }

  componentDidMount() {
    const pathNameArray = window.location.pathname.split('/');
    if (pathNameArray[pathNameArray.length - 2] === 'edit') {
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
    return (<div id="station-editor">
      <div className='station-header'>
        {`${this.state.title}途经站点`}
      </div>
      <div className='station-body'>
        <StationEditorBody/>
      </div>
    </div>);
  }
}