import {Component} from 'react';
import TrainNewHeader from './train-new-header';
import '../../../style/train-new.less';
import TrainNewBody from './train-new-body';

export default class TrainEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      trainInformation: {}
    }
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
    return (<div id="train-editor">
      <TrainNewHeader title={this.state.title}/>
      <div className="train-editor-body">
        <TrainNewBody/>
      </div>
    </div>);
  }
}
