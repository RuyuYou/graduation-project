import {Component} from 'react';

export default class SeatEditor extends Component {
  componentWillReceiveProps() {
    console.log(this.props.currentTicker);
  }

  render() {
    return (<div>
      hello
    </div>);
  }
}