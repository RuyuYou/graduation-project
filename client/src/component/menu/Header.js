import {Component} from 'react';
import {NavDropdown, MenuItem} from 'react-bootstrap';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    };
  }

  render() {
    return (
      <div>
        <div className='header' id='header'>
          <i className='fa fa-leaf'> </i>
          TWARS Admin
          <div className='nav-user-info pull-right'>
            <a><font color='white'><i className='fa fa-bell'> </i></font></a>
            <NavDropdown eventKey={1} title={this.state.username} id='basic-nav-dropdown'
                         className='menu-drop no-padding nav-inline'>
              <MenuItem eventKey={1.1}>
                <button className='btn btn-default'>
                  <i className='fa fa-power-off nav-inline'> </i>
                  &nbsp; 退出
                </button>
              </MenuItem>
            </NavDropdown>
          </div>
        </div>
      </div>
    );
  }
}
