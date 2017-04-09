import {Component} from 'react';
import Menu from './Menu';

export default class LeftNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      featureToggle: {},
      navigator: []
    };
  }

  render() {
    let leftNav = this.props.leftNav || [];
    return (
      <div className='left-nav' id='leftNav'>
        <div>
          <ul>
            {
              leftNav.map((item, index) => {
                return (<Menu key={index}
                              {...item}
                />);
              })
            }
          </ul>
        </div>
      </div>
    );
  }
}
