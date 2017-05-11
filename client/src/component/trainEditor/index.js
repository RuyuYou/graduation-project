import {Component} from 'react';
import TrainEditorHeader from './train-editor-header';
import '../../../style/train-editor.less';
import TrainEditorBody from './train-editor-body';
import superagent from 'superagent';
import noCache from 'superagent-no-cache';

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
      superagent
        .get(`/trains/${pathNameArray[2]}`)
        .use(noCache)
        .end((err, res)=> {
          if (err) {
            throw err;
          }
          this.setState({
            title: '修改',
            trainInformation: res.body
          });
        })
    } else {
      this.setState({
        title: '新增'
      })
    }
  }

  render() {
    return (<div id="train-editor">
      <TrainEditorHeader title={this.state.title}/>
      <div className="train-editor-body">
        <TrainEditorBody title={this.state.title}
                         trainInformation={this.state.trainInformation}/>
      </div>
    </div>);
  }
}
