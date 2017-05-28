import {Component} from 'react';

export default class TrainNewHeader extends Component {

  render() {
    return (<div className="train-editor-header">
      {`${this.props.title}车次`}
    </div>);
  }
}