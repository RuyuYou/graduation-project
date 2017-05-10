import {Component} from 'react';
import TrainEditorHeader from './train-editor-header';
import '../../../style/train-editor.less';
import TrainEditorBody from './train-editor-body';
import TrainEditorStartTime from './train-editor-startTime';

export default class TrainEditor extends Component {
  render() {
    return (<div id="train-editor">
      <TrainEditorHeader/>
      <div className="train-editor-body">
        <TrainEditorBody/>
        <TrainEditorStartTime/>
      </div>
    </div>);
  }
}
