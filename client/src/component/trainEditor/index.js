import {Component} from 'react';
import TrainEditorHeader from './train-editor-header';
import '../../../style/train-editor.less';
import TrainEditorBody from './train-editor-body';

export default class TrainEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ''
    }
  }

  componentDidMount() {
    const pathNameArray = window.location.pathname.split('/');
    if (pathNameArray[pathNameArray.length - 1] === 'edit') {
      this.setState({
        title: '修改车次'
      });
    } else {
      this.setState({
        title: '新增车次'
      })
    }
  }

  render() {
    return (<div id="train-editor">
      <TrainEditorHeader title={this.state.title}/>
      <div className="train-editor-body">
        <TrainEditorBody/>
      </div>
    </div>);
  }
}
