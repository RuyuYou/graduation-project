import {Component} from 'react';

export default class TrainEditorHeader extends Component {

  render() {
    return (<div className="train-editor-header">
      {this.props.title}
    </div>);
  }
}