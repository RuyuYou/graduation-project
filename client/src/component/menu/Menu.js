import {Component} from 'react';
import {Link} from 'react-router';

export default class Menu extends Component {

  render() {
    const {text, uri, selected, icon = 'leaf'} = this.props;
    let linkClass = selected ? 'menu active' : 'menu';
    return (
      <li>
        <Link to={uri} className={linkClass}>
          <i className={'menu-icon fa fa-' + icon}></i>{text}
        </Link>
      </li>
    );
  }
}
