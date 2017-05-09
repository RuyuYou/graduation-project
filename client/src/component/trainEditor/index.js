import {Component} from 'react';
import TrainEditorHeader from './train-editor-header';
import '../../../style/train-editor.less';

export default class TrainEditor extends Component {
  render() {
    return (<div id="train-editor">
      <TrainEditorHeader/>
    </div>);
  }
}
