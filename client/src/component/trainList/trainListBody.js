import {Component} from 'react';

const header = ['列车号', '总时长', '发车时间', '始发地', '终点站', '中间站'];

class ListHeader extends Component {
  render() {
    const title = header.map((item)=> {
      return (<th>{item}</th>)
    });
    return (
      <tr>
        <th><input type="checkbox"/></th>
        {title}
      </tr>
    )
  }
}

export default class TrainListBody extends Component {

  render() {

    return (<div>
      <table className="table table-striped table-bordered table-hover">
        <thead>
        <ListHeader />
        </thead>
      </table>
    </div>);
  }
}