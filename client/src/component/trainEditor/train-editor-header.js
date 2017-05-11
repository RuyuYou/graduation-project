import {Component} from 'react';

export default class TrainEditorHeader extends Component {

  judgeTitle() {
    const pathNameArray = window.location.pathname.split('/');
    if (pathNameArray[pathNameArray.length - 1] === 'edit') {
      return '修改车次';
    } else {
      return '新增车次';
    }
  }

  render() {
    return (<div className="train-editor-header">
      {this.judgeTitle()}
    </div>);
  }
}