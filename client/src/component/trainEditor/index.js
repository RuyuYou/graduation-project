import {Component} from 'react';
import TrainEditorHeader from './train-editor-header';
import '../../../style/train-editor.less';
import TrainEditorInfo from './train-editor-info';
import TrainEditorPlace from './train-editor-place';

export default class TrainEditor extends Component {
  render() {
    return (<div id="train-editor">
      <TrainEditorHeader/>
      <div className="train-editor-body">
        <TrainEditorInfo/>
        <TrainEditorPlace/>
      </div>
    </div>);
  }
}
